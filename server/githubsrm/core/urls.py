"""
URL configurations for GitHubSRM

"""
from django.contrib import admin
from django.urls import path, include, re_path
from apis.open_views import home

urlpatterns = [
    path('api/', include('apis.urls')),
    path('admin/', include('administrator.urls')),
    re_path('^(?P<path>.*)\/?$', home),
    path('', home)
]
