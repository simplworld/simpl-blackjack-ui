from django.conf import settings
from django.contrib.auth import get_user_model

from simpl_client import GamesAPIClient

from blackjack_ui.asyncio import coro


def payload_to_attrs(payload):
    return {
        "first_name": payload["first_name"],
        "last_name": payload["last_name"],
        "email": payload["email"],
        "is_active": payload["is_active"],
        "is_staff": payload["is_staff"],
        "is_superuser": payload["is_superuser"],
        "simpl_id": payload["id"],
    }


class SimplBackend(object):
    @coro
    async def authenticate(self, request, email=None, password=None, username=None):
        # dirty fix for using rest_auth with this example
        email = username
        user = None
        UserModel = get_user_model()
        simpl_client = GamesAPIClient(
            url=settings.SIMPL_GAMES_URL, auth=(email, password)
        )
        async with simpl_client as api_session:
            try:
                simpl_user = await api_session.users.get(email=email)
                runusers = await api_session.runusers.filter(
                    user=simpl_user.id, game_slug=settings.GAME_SLUG
                )
                if len(runusers) == 0:
                    return None
            except GamesAPIClient.NotAuthenticatedError:
                return None

            defaults = payload_to_attrs(simpl_user.payload)
            user, _ = UserModel._default_manager.get_or_create(
                email=email, defaults=defaults
            )
            return user if self.user_can_authenticate(user) else None

    def get_user(self, user_id):
        UserModel = get_user_model()
        try:
            user = UserModel.objects.get(pk=user_id)
        except UserModel.DoesNotExist:
            return None
        return user if self.user_can_authenticate(user) else None

    def user_can_authenticate(self, user):
        is_active = getattr(user, "is_active", None)
        return is_active or is_active is None
