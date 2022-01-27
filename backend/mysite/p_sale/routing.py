from django.urls import re_path,path

from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/status/(?P<user>\w+)/$', consumers.ChatConsumer.as_asgi()),
    path('ws/property/<int:id>/',consumers.IncreaseViews.as_asgi()),
]