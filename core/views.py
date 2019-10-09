from django.conf import settings
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views import generic

from simpl import simpl_client

from simpl_blackjack_ui.asyncio import coro


class HomeView(LoginRequiredMixin, generic.TemplateView):
    template_name = 'frontend/home.html'

    async def init_user_scopes(self, simpl_id):
        '''
        Initialize set of user's runs, worlds and runusers that determine simpl state contents.
        '''
        runs = set()
        worlds = set()
        runusers = set()
        is_leader = False

        async with simpl_client as api_session:

            game_runs = \
                await api_session.runs.filter(active=True,
                                              game_slug=settings.GAME_SLUG)
            user_runusers = \
                await api_session.runusers.filter(user=simpl_id,
                                                  game_slug=settings.GAME_SLUG)
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

    def get_context_data(self, **kwargs):
        ctx = super(HomeView, self).get_context_data(**kwargs)

        ctx['MODELSERVICE_WS'] = settings.MODEL_SERVICE_WS
        ctx['ROOT_TOPIC'] = settings.ROOT_TOPIC
        ctx['GAME_SLUG'] = settings.GAME_SLUG

        runs, worlds, runusers, is_leader = self.get_user_context()
        ctx['RUNS'] = runs
        ctx['WORLDS'] = worlds
        ctx['RUNUSERS'] = runusers
        ctx['LEADER'] = is_leader

        return ctx
