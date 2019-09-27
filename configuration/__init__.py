import os
from django.conf import settings


SIMPL_GAMES_URL = getattr(settings, 'SIMPL_GAMES_URL', 'http://localhost:8100/apis')
SIMPL_GAMES_AUTH = getattr(settings, 'SIMPL_GAMES_AUTH', None)
CALLBACK_URL = getattr(settings, 'CALLBACK_URL', 'http://{hostname}:{port}/api/callback')


def get_callback_url():
    return CALLBACK_URL.format(hostname=os.environ.get('HOSTNAME', ''), port=os.environ.get('PORT', ''))
