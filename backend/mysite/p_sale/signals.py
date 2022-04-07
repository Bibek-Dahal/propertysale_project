from django.db.models.signals import post_save,pre_save
from django.dispatch import receiver

from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from .models import KYC,House,Land
from django.core.mail import send_mail
from user_account.models import MyUser as User

# async_to_sync(channel_layer.group_send)("chat", {"type": "chat.force_disconnect"})
@receiver(post_save,sender= KYC)
def send_signal(sender,instance,created,**kwargs):
    if not created:
        print('updated')
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(f"status_{instance.user.username}", {
                'type': 'status_message',
                'message': instance.status.kyc_status
            })
        """
        send mail when KYC status has been verified
        """
        if instance.status.kyc_status == 'verified':
            subject = 'KYC Status Verification.'
            message = 'Hi %s your KYC has been successfully verified. Feel free to post your property. Thank You!' % instance.user.username
            from_email = 'bibek123@gmail.com'
            to_email = (User.objects.get(username=instance.user.username).email,)
            send_mail(subject,message,from_email,to_email)
        
        
"""
    both function sends the notification when new items is added and is_active is made true
"""
        
@receiver(pre_save, sender=House)
def on_change(sender, instance,**kwargs):
        if instance.id:
            previous = House.objects.get(id=instance.id)
            if previous.is_active != instance.is_active: 
                channel_layer = get_channel_layer()
                async_to_sync(channel_layer.group_send)("property", {
                        'type': 'status_message',
                        'message': "new house listed for sale"
                    })
@receiver(pre_save, sender=Land)
def on_change(sender, instance,**kwargs):
        if instance.id:
            previous = Land.objects.get(id=instance.id)
            if previous.is_active != instance.is_active: 
                channel_layer = get_channel_layer()
                async_to_sync(channel_layer.group_send)("property", {
                        'type': 'status_message',
                        'message': "new land listed for sale"
                    })