from .serializer import UserSerializer
from rest_framework.generics import ListAPIView
from user_account.models import MyUser as User
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import *
from rest_framework.viewsets import ModelViewSet

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class UserListView(ListAPIView):
    queryset = User.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer

class PorpertyView(ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer