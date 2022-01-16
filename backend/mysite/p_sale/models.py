from email.policy import default
from django.db import models
from .choices_type import Choice
from cloudinary.models import CloudinaryField
from user_account.models import MyUser as User
from autoslug import AutoSlugField


class PropertyType(models.Model):
    type = models.CharField(max_length=100)

    def __str__(self):
        return self.type

class Facility(models.Model):
    facility = models.CharField(max_length=200)

    class Meta:
        verbose_name = 'facility'
        verbose_name_plural = 'facilities'
    
    def __str__(self):
        return self.facility

class Seller(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    address = models.CharField(max_length=200,blank=True)
    mobile_num = models.PositiveIntegerField()

    def __str__(self):
        return self.user.username

class Property(models.Model):
    seller = models.ForeignKey(Seller,on_delete=models.CASCADE)
    title = models.CharField(max_length=300)
    slug = AutoSlugField(populate_from = 'title',null=True)
    description = models.TextField(blank=True)
    listing_type = models.CharField(max_length=100,choices=Choice.listing_type)
    property_type = models.ForeignKey(PropertyType,on_delete=models.CASCADE)
    condition = models.CharField(max_length=100,choices=Choice.listing_condition,blank=True)
    road_to_property = models.CharField(max_length=300,blank=True)
    access_road = models.CharField(max_length=80,blank=True)
    address = models.CharField(max_length=150)
    district = models.CharField(max_length=100)
    area = models.CharField(max_length=100,choices=Choice.area_type)
    ropani = models.CharField(max_length=100)
    aana = models.CharField(max_length=100)
    paisa = models.CharField(max_length=100)
    daam = models.CharField(max_length=100)
    price_in_number = models.IntegerField(default=0)
    price_in_words = models.CharField(max_length=200)
    price_negotiable =  models.CharField(max_length=3,choices=Choice.negotiable_type,default='No')
    facility = models.ManyToManyField(Facility,related_name='facilities',blank=True)
    furnishing = models.CharField(max_length = 50,choices=Choice.furnishing_type,blank=True)
    house_type = models.CharField(max_length=100,choices=Choice.house_type,blank=True)
    face_towards = models.CharField(max_length=40,choices=Choice.face_towards,blank=True)
    floors = models.PositiveBigIntegerField(blank=True)
    beds = models.PositiveBigIntegerField(blank=True)
    kitchen = models.PositiveBigIntegerField(blank=True)
    living = models.PositiveBigIntegerField(blank=True)
    bath = models.PositiveBigIntegerField(blank=True)
    property_main_image = CloudinaryField('main_image')
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)
    no_of_views = models.PositiveIntegerField(default=0)
    on_sale = models.BooleanField(default=True)
    is_active = models.BooleanField(default=False)
    
    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'property'
        verbose_name_plural = 'properties'

class DocumentImage(models.Model):
    property = models.ForeignKey(Property,on_delete=models.CASCADE,related_name='documents')
    document_image = CloudinaryField('doc_img')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class KYC(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    profile_pic = CloudinaryField('profile')
    citizenship_photo_front = CloudinaryField('citizenship_front')
    citizenship_photo_back = CloudinaryField('citizenship_back')
    occupation = models.CharField(max_length=150,blank=True)
    citizenship_num = models.SlugField(max_length=40)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)
    status = models.CharField(max_length=60,choices=Choice.kyc_type,default='pending')

class PropertyOwnerCertificate(models.Model):
    property = models.ForeignKey(Property,on_delete=models.CASCADE)
    image = CloudinaryField('pownImg')
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)
    









