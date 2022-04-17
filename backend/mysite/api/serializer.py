from typing_extensions import Required
from dj_rest_auth.serializers import PasswordChangeSerializer
from rest_framework import serializers
from user_account.models import MyUser as User
import re
from django.utils.translation import gettext_lazy as _
from .validators import check_int, check_pswd,custom_check_pswd,check_mobile_num
from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import PasswordResetConfirmSerializer
from p_sale.choices_type import Choice
from p_sale.models import (
    KYC,
    KYCStatus,
    ContactNum,
    HouseOwnerCertificate,
    AdditionalHouseImage,
    AdditionalLandImage,
    House,
    Land,
    LandOwnerCertificate,
    )
from p_sale import choices_type

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

class AdditionalLandImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdditionalLandImage
        fields = ('id','land','image')
        

class AdditionalHouseImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdditionalHouseImage
        fields = ('id','house','image')

class HouseOwnerCertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = HouseOwnerCertificate
        fields = ('id','house','certificate_image')
        read_only_fields = ('house',)

class HouseSerializer(serializers.ModelSerializer):
    images = AdditionalHouseImageSerializer(many=True,read_only = True)
    floors = serializers.CharField(default=0,max_length=3,validators=[check_int])
    beds = serializers.CharField(default=0,max_length=3,validators=[check_int])
    kitchen = serializers.CharField(default=0,max_length=3,validators=[check_int])
    living = serializers.CharField(default=0,max_length=3,validators=[check_int])
    parking = serializers.CharField(default=0,max_length=2,validators=[check_int])
    bath = serializers.CharField(default=0,max_length=2,validators=[check_int])
    province = serializers.ChoiceField(choices=choices_type.Choice.province,required=True)
    class Meta:
        model = House
        fields = '__all__'
        extra_fields = ['images']
        
        
        """
        here i have given related name in foreign key of additional images so i have used related name in extra_fields
        if related name was not provided the extra fields would be additionalhouseimage_set
        """
class LandOwnerCertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = LandOwnerCertificate
        fields = ('id','land','certificate_image')
        read_only_fields = ('land',)

class LandSerializer(serializers.ModelSerializer):
    images = AdditionalLandImageSerializer(many=True,read_only=True)
    province = serializers.ChoiceField(choices=choices_type.Choice.province,required=True)
    
    class Meta:
        model = Land
        fields = '__all__'
        extra_fields = ['images']

class UpdateHouseStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = House
        fields = ('status',)

class UpdateLandStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Land
        fields = ('status',)