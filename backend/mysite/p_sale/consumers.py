from asyncio.windows_events import NULL
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from p_sale.models import Property

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['user']
        self.room_group_name = 'status_%s' % self.room_name

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'status_message',
                'message': message
            }
        )

    # Receive message from room group
    async def status_message(self, event):
        message = event['message']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message
        }))


class IncreaseViews(AsyncWebsocketConsumer):
    async def connect(self):
        self.property_id = self.scope['url_route']['kwargs']['id']
        self.group_name = 'property_%d' % self.property_id

        # Join room group
        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )
        
        await self.accept()

        #send mag to groups after connection
        await self.channel_layer.group_send(
            self.group_name,
            {
                'type': 'status_message',
                'message': await self.get_views_count(self.property_id)
            }
        )
    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )

    @database_sync_to_async
    def get_views_count(self,property_id):
        try:
            pro_obj = Property.objects.get(id = property_id)
            pro_obj.no_of_views += 1
            pro_obj.save()
            return pro_obj.no_of_views
        except Exception as e:
            print('exception called')
            return None

    async def status_message(self, event):
        message = event['message']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message
        }))