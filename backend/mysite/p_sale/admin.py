from django.contrib import admin
from .models import *
# Register your models here.
@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ('id','title','slug','on_sale','description','listing_type','property_type')
    fieldsets = (
        (None, {
            'fields': ('seller','title', 'description', 'listing_type','property_type','condition','road_to_property','access_road')
        }),
        ('Location', {
            'fields': ('address', 'district'),
        }),
        ('Land Area', {
            'fields': ('area', 'ropani','aana','paisa','daam'),
        }),
        ('Price', {
            'fields': ('price_in_number', 'price_in_words','price_negotiable'),
        }),
        ('Facilities', {
            'fields': ('facility',),
        }),
        ('Furnishing', {
            'fields': ('furnishing',),
        }),
        ('Face Towards', {
            'fields': ('face_towards',),
        }),
        ('Floors&Rooms', {
            'fields': ('floors','beds','kitchen','living','bath'),
        }),
        (None, {
            'fields': ('property_main_image','no_of_views','is_active'),
        }),
    )

@admin.register(Facility)
class FacilityAdmin(admin.ModelAdmin):
    list_display = ('id','facility')

@admin.register(AdditionalPropertyImage)
class AdditionalPropertyImageAdmin(admin.ModelAdmin):
    list_display = ('id','image','created_at','updated_at')

@admin.register(PropertyType)
class PropertyTypeAdmin(admin.ModelAdmin):
    list_display = ('id','type')

@admin.register(KYC)
class KYC(admin.ModelAdmin):
    list_display = ('id','user','profile_pic','citizenship_photo_front','citizenship_photo_back','occupation','status')

@admin.register(ContactNum)
class ContactNumAdmin(admin.ModelAdmin):
    list_display = ('id','user','mobile_num')

@admin.register(PropertyOwnerCertificate)
class PropertyOwnerCertificateAdmin(admin.ModelAdmin):
    list_display = ('id','property','image')