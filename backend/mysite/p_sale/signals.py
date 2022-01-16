from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import KYC
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer


# async_to_sync(channel_layer.group_send)("chat", {"type": "chat.force_disconnect"})
@receiver(post_save,sender= KYC)
def send_signal(sender,instance,created,**kwargs):
    if not created:
        print('updated')
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(f"status_{instance.user.username}", {
                'type': 'status_message',
                'message': instance.status
            })