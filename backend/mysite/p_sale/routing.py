from django.urls import re_path,path
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/status/(?P<user>\w+)/$', consumers.KycStatusConsumer.as_asgi()),
    path('ws/house/<int:id>/',consumers.IncreaseHouseViews.as_asgi()),
    path('ws/land/<int:id>/',consumers.IncreaseLandViews.as_asgi()),
    path('ws/property/',consumers.NewPropertyAddedView.as_asgi()),
]