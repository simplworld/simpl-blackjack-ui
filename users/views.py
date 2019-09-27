from django.conf import settings
from django.contrib.auth import get_user_model

from rest_framework import views, response

from simpl import simpl_client

from simpl_calc_ui.asyncio import coro
from .backends import payload_to_attrs


class CallbackAPIView(views.APIView):

    @coro
    async def _get_user_from_simpl(self, email):
        user = await simpl_client.users.get(email=email)
        return payload_to_attrs(user.payload)

    def create_user_from_runuser(self, payload):
        User = get_user_model()
        User.objects.create(**self._get_user_from_simpl(payload['email']))
        return response.Response('CREATED', status=201)

    def update_user_from_runuser(self, user, payload):
        attrs = self._get_user_from_simpl(payload['email'])
        for k, v in attrs.items():
            setattr(user, k, v)
        user.save()
        return response.Response('OK', status=200)

    def deactivate_user(self, user):
        user.is_active = False
        user.save()
        return response.Response('', status=204)

    def post(self, request, *args, **kwargs):
        User = get_user_model()
        event = request.data['event']
        payload = request.data['data']

        if event.startswith('user'):
            resource_name, action = event.rsplit('.', 2)
        else:
            _, resource_name, action = event.rsplit('.', 2)

        if resource_name == 'user':
            try:
                User.objects.get(pk=payload['id'])
            except User.DoesNotExist:
                return response.Response('OK')

            user = User.objects.get(pk=payload['id'])
            attrs = payload_to_attrs(payload)

            if action == 'changed':
                for k, v in attrs.items():
                    setattr(user, k, v)
                user.save()
                return response.Response('OK', status=200)

            elif action == 'deleted':
                return self.deactivate_user(user)

        if resource_name == 'runuser':
            if action == 'created':
                try:
                    User.objects.get(pk=payload['user'])
                except User.DoesNotExist:
                    return self.create_user_from_runuser(payload)
                return response.Response('OK')
            elif action == 'changed':
                try:
                    user = User.objects.get(pk=payload['user'])
                except User.DoesNotExist:
                    # RunUser has been modified to belong to this game
                    if payload['game_slug'] == settings.GAME_SLUG:
                        return self.create_user_from_runuser(payload)
                    else:
                        # No idea what to do
                        return response.Response('NOT FOUND', status=404)

                if payload['game_slug'] == settings.GAME_SLUG:
                    # Just a simple update
                    return self.update_user_from_runuser(user, payload)
                else:
                    # RunUser has been unassigned from this game
                    return self.deactivate_user(user)
            elif action == 'deleted':
                try:
                    user = User.objects.get(pk=payload['user'])
                except User.DoesNotExist:
                    return response.Response('NOT FOUND', status=404)

                return self.deactivate_user(user)
