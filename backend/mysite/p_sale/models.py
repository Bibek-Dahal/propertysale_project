from email.policy import default
from django.db import models
from .choices_type import Choice
from cloudinary.models import CloudinaryField
from user_account.models import MyUser as User
from autoslug import AutoSlugField

class PropertyType(models.Model):
    type = models.CharField(max_length=100,unique=True,primary_key=True)

    def __str__(self):
        return self.type

class Facility(models.Model):
    facility = models.CharField(max_length=200,unique=True,primary_key=True)

    class Meta:
        verbose_name = 'facility'
        verbose_name_plural = 'facilities'
    
    def __str__(self):
        return self.facility

class KYCStatus(models.Model):
    kyc_status = models.CharField(max_length=40,unique=True,primary_key=True)
    
    """pending,verifying"""

    def __str__(self):
        return self.kyc_status

    class Meta:
        verbose_name = 'kyc status'
        verbose_name_plural = 'kyc status'

class KYC(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    profile_pic = CloudinaryField('profile')
    citizenship_photo_front = CloudinaryField('citizenship_front')
    citizenship_photo_back = CloudinaryField('citizenship_back')
    occupation = models.CharField(max_length=150,blank=True)
    citizenship_num = models.SlugField(max_length=40)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)
    status = models.ForeignKey(KYCStatus,on_delete=models.PROTECT,default="pending")

    def __str__(self):
        return self.user.username

class ContactNum(models.Model):
    kyc_id = models.ForeignKey(KYC,related_name='contact_nums',on_delete=models.CASCADE)
    country_code = models.CharField(max_length=4,default='+977')
    mobile_num = models.CharField(max_length=10)

    # def __str__(self):
    #     return self.user.user.username


#Table Modification
class PropertyStatus(models.Model):
    status = models.CharField(max_length=40,unique=True,primary_key=True)

    def __str__(self):
        return self.status
    
    class Meta:
        verbose_name = 'property status'
        verbose_name_plural = 'property status'

class AreaType(models.Model):
    area = models.CharField(max_length=30,unique=True,primary_key=True)

    def __str__(self):
        return self.area

    """specifies ropani dhur kathha"""

class ListingType(models.Model):
    listing_type = models.CharField(max_length=100,unique=True,primary_key=True)

    def __str__(self):
        return self.listing_type
    
    """top_listing,premium_listing....."""

class ListingConditioin(models.Model):
    listing_condition = models.CharField(max_length=100,unique=True,primary_key=True)

    def __str__(self):
        return self.listing_condition
    """Brand new, Used"""

class FurnishingType(models.Model):
    furnishing_type = models.CharField(max_length=150,unique=True,primary_key=True)

    def __str__(self):
        return self.furnishing_type
    
    """fully_furnished,semi_furnished"""

class HouseType(models.Model):
    house_type = models.CharField(max_length=100,unique=True,primary_key=True)

    def __str__(self):
        return self.house_type
    
    """flat_system,appartment"""

class FaceTowards(models.Model):
    face_towards = models.CharField(max_length=100,unique=True,primary_key=True)
    
    def __str__(self):
        return self.face_towards
    """east,west"""
    class Meta:
        verbose_name = 'face towards'
        verbose_name_plural = 'face towards'

class Property(models.Model):
    seller = models.ForeignKey(User,on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    slug = AutoSlugField(populate_from = 'title')
    description = models.TextField(blank=True)
    listing_type = models.ForeignKey(ListingType,on_delete=models.PROTECT)
    road_to_property = models.CharField(max_length=300,blank=True)
    access_road = models.CharField(max_length=80,blank=True)
    district = models.CharField(max_length=30)
    province = models.CharField(max_length=1,choices=Choice.province,null=True)
    zone = models.CharField(max_length=30)
    zip = models.PositiveIntegerField()
    landmark = models.CharField(max_length=200)
    area = models.ForeignKey(AreaType,on_delete=models.PROTECT)
    ropani = models.PositiveSmallIntegerField()
    aana = models.PositiveSmallIntegerField()
    paisa = models.PositiveSmallIntegerField()
    daam = models.PositiveSmallIntegerField()
    price_in_number = models.PositiveIntegerField()
    price_in_words = models.CharField(max_length=200)
    price_negotiable =  models.CharField(max_length=3,choices=Choice.negotiable_type,default='No')
    face_towards = models.ForeignKey(FaceTowards,on_delete=models.PROTECT)
    main_image = CloudinaryField('main_image')
    url = models.URLField(null=True,blank=True)
    latitude = models.FloatField()
    longitude = models.FloatField()
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)
    no_of_views = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=False)
    status = models.ForeignKey(PropertyStatus,on_delete=models.PROTECT)

    class Meta:
        abstract = True
    """
    since it is an abstract class its table will not be created
    """

class Land(Property):
    objects = models.Manager()
    """
    Model Manager
    """
    class Meta:
        ordering = ['-created_at']
        
    class PropertyManager(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(status='Up',is_active=True)
            
    properties = PropertyManager()

    def __str__(self):
        return f"{self.id}-{self.title}"

class AdditionalLandImage(models.Model):
    """
    one land can have additional images
    """
    land = models.ForeignKey(Land,on_delete=models.CASCADE,related_name='images')
    image = CloudinaryField('image',blank=True,null=True)
    created_at = models.DateTimeField(auto_now_add=True)

class LandOwnerCertificate(models.Model):
    """
    images like laalpurja naksa
    """
    land = models.ForeignKey(Land,on_delete=models.CASCADE)
    certificate_image = CloudinaryField('certificate_image')
    created_at = models.DateTimeField(auto_now_add = True)

class House(Property):
    """
    property type indicates whether house is for sale or house is for rent
    if house for rent is true for_sale field should be false else True
    """
    per = models.CharField(max_length=30,null=True)
    property_type = models.ForeignKey(PropertyType,on_delete=models.CASCADE)
    condition = models.ForeignKey(ListingConditioin,on_delete=models.PROTECT)
    facility = models.ManyToManyField(Facility,related_name='facilities',blank=True)
    furnishing = models.ForeignKey(FurnishingType,on_delete=models.PROTECT)
    house_type = models.ForeignKey(HouseType,on_delete=models.PROTECT,blank=True,null=True)
    floors = models.CharField(default=1,max_length=3)
    beds = models.CharField(default=1,max_length=3)
    kitchen = models.CharField(default=1,max_length=3)
    living = models.CharField(default=1,max_length=3)
    parking = models.CharField(default=0,max_length=2)
    bath = models.CharField(default=0,max_length=2)

    class Meta:
        ordering = ['-created_at']

    objects = models.Manager()
    """
    Model Manager
    """
    class PropertyManager(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(status='Up',is_active=True)
            
    properties = PropertyManager()

    def __str__(self):
        return f"{self.id}-{self.title}"

class AdditionalHouseImage(models.Model):
    """
    one house can have additional images
    """
    house = models.ForeignKey(House,on_delete=models.CASCADE,related_name='images')
    image = CloudinaryField('image',blank=True,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    

class HouseOwnerCertificate(models.Model):
    """
    images like laalpurja naksa
    """
    house = models.ForeignKey(House,on_delete=models.CASCADE)
    certificate_image = CloudinaryField('certificate_image')
    created_at = models.DateTimeField(auto_now_add = True)
   


   









