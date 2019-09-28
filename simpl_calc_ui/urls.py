"""frontend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.auth.views import LoginView, logout_then_login

from core import views as core_views

from users import views as users_views
from cuser.forms import AuthenticationForm

urlpatterns = \
    [
        url(r'^api/callback', users_views.CallbackAPIView.as_view()),
        url(r'^login/$',
            LoginView.as_view(authentication_form=AuthenticationForm),
            name='login'),
        url(r'^logout/$', logout_then_login, name='logout'),
        url(r'^admin/', admin.site.urls),
        url(r'^.*$', core_views.HomeView.as_view()),
    ] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
