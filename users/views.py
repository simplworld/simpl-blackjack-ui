import requests

from django.conf import settings
from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework import views
from rest_framework.response import Response

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_auth.views import LoginView as RestAuthLoginView

from simpl import simpl_client

from blackjack_ui.asyncio import coro

from .backends import payload_to_attrs
from .serializers import RegisterSerializer


class LoginView(RestAuthLoginView):
    """
    Overriding Rest Auth Login View because of CSRF issue when using
    Token and Session Auth
    """

    authentication_classes = ()


class RegisterView(APIView):
    """
    Register a new user
    """

    authentication_classes = ()

    def setup_user(self, simpl_id):
        """ Setup this user's RunUser and initial Scenario """
        # Get Run
        response = requests.get(
            url=settings.SIMPL_GAMES_URL + f"runs/?game_slug={settings.GAME_SLUG}",
            headers={"Accept": "application/json"},
            auth=settings.SIMPL_GAMES_AUTH,
        )
        runs = response.json()
        first_run = runs[0]
        run_id = first_run["id"]

        # Setup RunUser
        response = requests.post(
            url=settings.SIMPL_GAMES_URL + "runusers/",
            headers={"Accept": "application/json"},
            auth=settings.SIMPL_GAMES_AUTH,
            data={
                "leader": False,
                "active": True,
                "user": simpl_id,
                "run": run_id,
                "world": None,
                "role": None,
            },
        )
        runuser_data = response.json()

        # Setup Scenario
        response = requests.post(
            url=settings.SIMPL_GAMES_URL + "scenarios/",
            headers={"Accept": "application/json"},
            auth=settings.SIMPL_GAMES_AUTH,
            data={
                "name": "Scenario 1",
                "data": {},
                "runuser": runuser_data["id"],
                "world": None,
            },
        )
        print(response.status_code)
        print(response.content)
        scenario_data = response.json()

        # Setup Initial Empty Period
        response = requests.post(
            url=settings.SIMPL_GAMES_URL + "periods/",
            headers={"Accept": "application/json"},
            auth=settings.SIMPL_GAMES_AUTH,
            data={"order": 1, "data": {}, "scenario": scenario_data["id"]},
        )

        print(response.status_code)
        print(response.content)

    def post(self, request, format=None):
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            # process registration
            data = {
                "first_name": "Blackjack",
                "last_name": "Demo",
                "email": serializer.validated_data["username"],
                "password": serializer.validated_data["password"],
                "is_staff": False,
                "is_superuser": False,
            }
            response = requests.post(
                url=settings.SIMPL_GAMES_URL + "users/",
                data=data,
                auth=settings.SIMPL_GAMES_AUTH,
            )

            if response.status_code == 201:
                simpl_id = response.json()["id"]
                self.setup_user(simpl_id)

            print(response.status_code)
            print(response.content)
            return Response({"message": "User created"})
        else:
            return Response(
                {"error": "Unable to create user"}, status=status.HTTP_400_BAD_REQUEST
            )


class UserDetailView(APIView):
    """
    View for retrieving all the important data of a single user
    """

    permission_classes = (IsAuthenticated,)

    async def init_user_scopes(self, simpl_id):
        """
        Initialize set of user's runs, worlds and runusers that determine simpl state contents.
        """
        runs = set()
        worlds = set()
        runusers = set()
        is_leader = False

        async with simpl_client as api_session:

            game_runs = await api_session.runs.filter(
                active=True, game_slug=settings.GAME_SLUG
            )
            user_runusers = await api_session.runusers.filter(
                user=simpl_id, game_slug=settings.GAME_SLUG
            )
            for run in game_runs:
                for user_runuser in user_runusers:
                    if user_runuser.run == run.id:
                        if user_runuser.leader:
                            runs.add(run.id)
                            is_leader = True
                        else:
                            runusers.add(user_runuser.id)
                            if user_runuser.world:
                                worlds.add(user_runuser.world)

        return runs, worlds, runusers, is_leader

    @coro
    async def get_user_context(self):
        return await self.init_user_scopes(self.request.user.simpl_id)

    def get(self, request, format=None):
        """
        Get user data
        """
        runs, worlds, runusers, is_leader = self.get_user_context()
        data = {
            "auth_id": request.user.simpl_id,
            "modelservice_ws": settings.MODEL_SERVICE_WS,
            "root_topic": settings.ROOT_TOPIC,
            "game_slug": settings.GAME_SLUG,
            "runs": runs,
            "worlds": worlds,
            "runusers": runusers,
            "leader": is_leader,
        }
        return Response(data)


class CallbackAPIView(views.APIView):
    @coro
    async def _get_user_from_simpl(self, email):
        user = await simpl_client.users.get(email=email)
        return payload_to_attrs(user.payload)

    def create_user_from_runuser(self, payload):
        User = get_user_model()
        User.objects.create(**self._get_user_from_simpl(payload["email"]))
        return Response("CREATED", status=201)

    def update_user_from_runuser(self, user, payload):
        attrs = self._get_user_from_simpl(payload["email"])
        for k, v in attrs.items():
            setattr(user, k, v)
        user.save()
        return Response("OK", status=200)

    def deactivate_user(self, user):
        user.is_active = False
        user.save()
        return Response("", status=204)

    def post(self, request, *args, **kwargs):
        User = get_user_model()
        event = request.data["event"]
        payload = request.data["data"]

        if event.startswith("user"):
            resource_name, action = event.rsplit(".", 2)
        else:
            _, resource_name, action = event.rsplit(".", 2)

        if resource_name == "user":
            try:
                User.objects.get(pk=payload["id"])
            except User.DoesNotExist:
                return Response("OK")

            user = User.objects.get(pk=payload["id"])
            attrs = payload_to_attrs(payload)

            if action == "changed":
                for k, v in attrs.items():
                    setattr(user, k, v)
                user.save()
                return Response("OK", status=200)

            elif action == "deleted":
                return self.deactivate_user(user)

        if resource_name == "runuser":
            if action == "created":
                try:
                    User.objects.get(pk=payload["user"])
                except User.DoesNotExist:
                    return self.create_user_from_runuser(payload)
                return Response("OK")
            elif action == "changed":
                try:
                    user = User.objects.get(pk=payload["user"])
                except User.DoesNotExist:
                    # RunUser has been modified to belong to this game
                    if payload["game_slug"] == settings.GAME_SLUG:
                        return self.create_user_from_runuser(payload)
                    else:
                        # No idea what to do
                        return Response("NOT FOUND", status=404)

                if payload["game_slug"] == settings.GAME_SLUG:
                    # Just a simple update
                    return self.update_user_from_runuser(user, payload)
                else:
                    # RunUser has been unassigned from this game
                    return self.deactivate_user(user)
            elif action == "deleted":
                try:
                    user = User.objects.get(pk=payload["user"])
                except User.DoesNotExist:
                    return Response("NOT FOUND", status=404)

                return self.deactivate_user(user)
