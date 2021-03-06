from django.contrib import admin
from .models import *

@admin.register(Facility)
class FacilityAdmin(admin.ModelAdmin):
    list_display = ('facility',)

@admin.register(PropertyType)
class PropertyTypeAdmin(admin.ModelAdmin):
    list_display = ('type',)

@admin.register(AreaType)
class PropertyTypeAdmin(admin.ModelAdmin):
    list_display = ('area',)

@admin.register(ListingType)
class PropertyTypeAdmin(admin.ModelAdmin):
    list_display = ('listing_type',)

@admin.register(ListingConditioin)
class PropertyTypeAdmin(admin.ModelAdmin):
    list_display = ('listing_condition',)


@admin.register(FurnishingType)
class PropertyTypeAdmin(admin.ModelAdmin):
    list_display = ('furnishing_type',)

@admin.register(HouseType)
class PropertyTypeAdmin(admin.ModelAdmin):
    list_display = ('house_type',)

@admin.register(FaceTowards)
class PropertyTypeAdmin(admin.ModelAdmin):
    list_display = ('face_towards',)

@admin.register(ContactNum)
class FacilityTypeAdmin(admin.ModelAdmin):
    list_display = ('id','kyc_id','mobile_num')

@admin.register(KYC)
class KYC(admin.ModelAdmin):
    list_display = ('id','user','profile_pic','citizenship_photo_front','citizenship_photo_back','occupation','status')

@admin.register(KYCStatus)
class PropertyTypeAdmin(admin.ModelAdmin):
    list_display = ('kyc_status',)

@admin.register(PropertyStatus)
class PropertyTypeAdmin(admin.ModelAdmin):
    list_display = ('status',)

@admin.register(House)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ('id','title','slug','description','listing_type','property_type')
    fieldsets = (
        (None, {
            'fields': ('seller','title', 'description', 'listing_type','house_type','property_type','condition','road_to_property','access_road')
        }),
        ('Location', {
            'fields': ('district','zone','province','landmark','zip'),
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
            'fields': ('floors','beds','kitchen','living','parking','bath'),
        }),
        (None, {
            'fields': ('main_image','url','no_of_views','longitude','latitude','is_active','status'),
        }),
    )

@admin.register(AdditionalHouseImage)
class PropertyTypeAdmin(admin.ModelAdmin):
    list_display = ('id','house','image','created_at')

@admin.register(HouseOwnerCertificate)
class PropertyTypeAdmin(admin.ModelAdmin):
    list_display = ('id','house','certificate_image','created_at')

@admin.register(Land)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ('id','seller','title','slug','description','listing_type')
    fieldsets = (
        (None, {
            'fields': ('seller','title', 'description', 'listing_type','road_to_property','access_road')
        }),
        ('Location', {
            'fields': ('district','zone','province','landmark','zip'),
        }),
        ('Land Area', {
            'fields': ('area', 'ropani','aana','paisa','daam'),
        }),
        ('Price', {
            'fields': ('price_in_number', 'price_in_words','price_negotiable'),
        }),
        ('Face Towards', {
            'fields': ('face_towards',),
        }),
        (None, {
            'fields': ('main_image','url','no_of_views','longitude','latitude','is_active','status'),
        }),
    )

@admin.register(AdditionalLandImage)
class PropertyTypeAdmin(admin.ModelAdmin):
    list_display = ('id','land','image','created_at')

@admin.register(LandOwnerCertificate)
class PropertyTypeAdmin(admin.ModelAdmin):
    list_display = ('id','land','certificate_image','created_at')



