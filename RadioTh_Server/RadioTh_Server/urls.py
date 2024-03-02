"""
URL configuration for RadioTh_Server project.

"""
from django.contrib import admin
from django.urls import path
from . import views
from django.contrib.staticfiles.storage import staticfiles_storage
from django.views.generic.base import RedirectView


urlpatterns = [
    # path('admin/', admin.site.urls),
    # Redirect to the favicon.ico file
    path(
        "favicon.ico",
        RedirectView.as_view(url=staticfiles_storage.url("favicon.ico")),
    ),
    path('api/', views.treatment_list, name='treatment_list')
]
