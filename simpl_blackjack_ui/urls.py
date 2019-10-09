from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic import TemplateView

#from django.contrib.auth.views import LoginView, logout_then_login

#from core import views as core_views

from users import views as users_views
from users import urls as users_urls

#from cuser.forms import AuthenticationForm

urlpatterns = \
    [
        url(r'^api/callback', users_views.CallbackAPIView.as_view()),
        url(r'^api/', include((users_urls, 'users_api'))),
        # url(r'^login/$',
        #     LoginView.as_view(authentication_form=AuthenticationForm),
        #     name='login'),
        #url(r'^logout/$', logout_then_login, name='logout'),
        url(r'^admin/', admin.site.urls),
        # url(r'^.*$', core_views.HomeView.as_view()),
        url(r'^.*$', TemplateView.as_view(
            template_name='core/index.html'
        )),
    ] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
