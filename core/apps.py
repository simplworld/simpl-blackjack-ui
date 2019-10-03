from django.apps import AppConfig
from django.conf import settings

from simpl import subscribe


class FrontendConfig(AppConfig):
    name = 'core'

    def ready(self):
        subscribe('user')
        subscribe(settings.GAME_SLUG)
