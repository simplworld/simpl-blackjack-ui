from django.conf.urls import url

from rest_auth.views import LogoutView

from .views import LoginView, UserDetailView, RegisterView, CallbackAPIView


urlpatterns = [
    url(r"^callback", CallbackAPIView.as_view(), name="callback"),
    url(r"^login/$", LoginView.as_view(), name="login"),
    url(r"^logout/$", LogoutView.as_view(), name="logout"),
    url(r"^register/$", RegisterView.as_view(), name="register"),
    url(r"^me/$", UserDetailView.as_view()),
]
