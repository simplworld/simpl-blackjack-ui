from django.conf import settings
from django.conf.urls import include, url
from django.urls import re_path
from django.contrib import admin
from django.views.generic import TemplateView
from django.views.static import serve

from users import views as users_views
from users import urls as users_urls

urlpatterns = [
    url(r"^api/callback", users_views.CallbackAPIView.as_view()),
    url(r"^api/", include((users_urls, "users_api"))),
    url(r"^admin/", admin.site.urls),
    re_path(
        r"^static/(?P<path>.*)$",
        serve,
        kwargs={"document_root": settings.STATIC_ROOT, "show_indexes": True},
    ),
    url(r"^.*$", TemplateView.as_view(template_name="core/index.html")),
]
