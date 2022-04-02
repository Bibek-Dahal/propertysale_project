from .serializer import  UserSerializer,KycSerializer,UpdateKycSerializer,UserContactSerializer
from rest_framework.generics import ListAPIView
from user_account.models import MyUser as User
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import FormParser,MultiPartParser
from p_sale.models import KYC


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

class RetriveUserView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
        queryset = User.objects.get(username=self.request.user)
        serializer = UserSerializer(queryset)
        return Response(serializer.data)

class UpdateUserView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
        queryset = User.objects.get(username=self.request.user)
        serializer = UserSerializer(queryset)
        return Response(serializer.data)
        
    def patch(self, request, format=None):
        user = User.objects.get(username=self.request.user)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CreateKycView(APIView):
    parser_classes = [MultiPartParser,FormParser]
    permission_class = [IsAuthenticated]
    def post(self,request):
        kyc_serializer = KycSerializer(data = request.data)
        contact_serializer = UserContactSerializer(data=request.data)
        
        if kyc_serializer.is_valid():
            if contact_serializer.is_valid():
                kyc_serializer.save()
                contact_serializer.save()
                return Response(kyc_serializer.data,status=status.HTTP_201_CREATED)
            return Response(contact_serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        return Response(kyc_serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        
class RetriveKycView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
        try:
            print(KYC.objects.get(user=request.user))
            print(request.user)
            queryset = KYC.objects.get(user=request.user)
            serializer = KycSerializer(queryset)
            return Response(serializer.data,status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"detail":"KYC doesnot exists."},status=status.HTTP_404_NOT_FOUND)

class UpdateUserKycView(APIView):
    permission_classes = [IsAuthenticated]
        
    def patch(self, request, format=None):
        try:
            user = KYC.objects.get(user=self.request.user)
            serializer = UpdateKycSerializer(user, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({"detail":"KYC doesnot exists."},status=status.HTTP_404_NOT_FOUND)
