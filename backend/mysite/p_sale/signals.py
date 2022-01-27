from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import KYC,Property
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
        
        

@receiver(post_save,sender= Property)
def send_property_signal(sender,instance,created,*args,**kwargs):
    if not created:
        print('property updated')
        #sends msg when is_active is changed to true
        if instance.is_active == True and instance.is_sold == False:
            channel_layer = get_channel_layer()
            async_to_sync(channel_layer.group_send)("property", {
                    'type': 'status_message',
                    'message': "new item listed for sale"
                })
        