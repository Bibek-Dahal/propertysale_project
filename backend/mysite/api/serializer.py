from typing_extensions import Required
from dj_rest_auth.serializers import PasswordChangeSerializer
from rest_framework import serializers
from user_account.models import MyUser as User
import re
from django.utils.translation import gettext_lazy as _
from .validators import check_pswd,custom_check_pswd,check_mobile_num
from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import PasswordResetConfirmSerializer
from p_sale.choices_type import Choice
from p_sale.models import KYC,KYCStatus,ContactNum

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ('username','email','first_name','last_name')


# class ChangePasswordSerializer(serializers.ModelSerializer):
#     password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
#     password2 = serializers.CharField(write_only=True, required=True)
#     old_password = serializers.CharField(write_only=True, required=True)

#     class Meta:
#         model = User
#         fields = ('old_password', 'password', 'password2')

#     def validate(self, attrs):
#         if attrs['password'] != attrs['password2']:
#             raise serializers.ValidationError({"password": "Password fields didn't match."})

#         return(check_pswd(attrs))

#     def validate_old_password(self, value):
#         user = self.context['request'].user
#         if not user.check_password(value):
#             raise serializers.ValidationError("Old password is not correct")
#         return value

#     def update(self, instance, validated_data):
#         instance.set_password(validated_data['password'])
#         instance.save()
#         return instance

class UserRegistreSeriliazer(RegisterSerializer):
    password1 = serializers.CharField(write_only=True,validators = [custom_check_pswd])
    password2 = serializers.CharField(write_only=True,validators = [custom_check_pswd])

    def validate_username(self, username):
        if User.objects.filter(username = username).exists():
            raise serializers.ValidationError('A user is already registered with this username.')
        return username
    
    def save(self, request):
        return super().save(request)

class UserPasswordChangeSerializer(PasswordChangeSerializer):
    new_password1 = serializers.CharField(max_length=128,validators = [custom_check_pswd])
    new_password2 = serializers.CharField(max_length=128)

class UserPasswordResetConfirmSerializer(PasswordResetConfirmSerializer):
    new_password1 = serializers.CharField(max_length=128,validators = [custom_check_pswd])
    new_password2 = serializers.CharField(max_length=128)

class UserSerializer(serializers.ModelSerializer):
    date_of_birth = serializers.DateField(required=True)
    gender = serializers.ChoiceField(choices=Choice.gender,required=True)
    class Meta:
        model = User
        fields = ('id','username','email','first_name','last_name','date_of_birth','gender')
        read_only_fields = ('id','email',)

class UserContactSerializer(serializers.ModelSerializer):
    mobile_num = serializers.CharField(max_length=10,validators=[check_mobile_num])
    class Meta:
        model = ContactNum
        fields = ('id','kyc_id','mobile_num')
        read_only_fields = ('kyc_id',)

class KycSerializer(serializers.ModelSerializer):
    contact_nums = UserContactSerializer(many=True,read_only=True)
    class Meta:
        model = KYC
        fields = ('user','profile_pic','citizenship_photo_front','citizenship_photo_back','occupation','contact_nums','citizenship_num','status')

class UpdateKycSerializer(serializers.ModelSerializer):
    class Meta:
        model = KYC
        fields = ('profile_pic','citizenship_photo_front','citizenship_photo_back','occupation')

    def update(self, instance, validated_data):
        
        instance.status = KYCStatus.objects.get(kyc_status='pending')
        instance.citizenship_photo_front = validated_data.get('citizenship_photo_front', instance.citizenship_photo_front)
        instance.citizenship_photo_back = validated_data.get('citizenship_photo_back', instance.citizenship_photo_back)
        instance.profile_pic = validated_data.get('profile_pic', instance.profile_pic)
        instance.save()
        return instance
        

        