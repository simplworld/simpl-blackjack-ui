from django.conf.urls import url

from rest_auth.views import LogoutView

from .views import (
        LoginView,
        UserDetailView,
    )


urlpatterns = [
    url(r'^login/$', LoginView.as_view(), name='login'),
    url(r'^logout/$', LogoutView.as_view(), name='logout'),
    url(r'^me/$', UserDetailView.as_view()),
]
