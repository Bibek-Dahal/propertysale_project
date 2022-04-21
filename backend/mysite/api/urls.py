from django.urls import path
from django.urls.conf import include
from .import views
from dj_rest_auth.registration.views import VerifyEmailView,ConfirmEmailView
from dj_rest_auth.views import PasswordResetView
from rest_framework.routers import DefaultRouter

app_name = 'api'

urlpatterns = [
    #retrive all user
    path('user/',views.UserListView.as_view(),name="user_all"),
    #Login Logout passwd change
    path('account/', include('dj_rest_auth.urls')),
    #user registration
    path('account/registration/', include('dj_rest_auth.registration.urls')),
    path('account/password/reset/', PasswordResetView.as_view(), name='account_password_reset'), 

    path('retrive-user/',views.RetriveUserView.as_view(),name='retrive_user'),
    path('update-user/',views.UpdateUserView.as_view(),name='update_user'),
    #KYC
    path('kyc-create/',views.CreateKycView.as_view(),name="create_kyc"),
    path('kyc-retrive/',views.RetriveKycView.as_view(),name="retrive_kyc"),
    path('kyc-update/',views.UpdateUserKycView.as_view(),name="update_kyc"),

    #property
    path('property/post-house/',views.PostHouseView.as_view(),name="post_property"),
    path('property/post-land/',views.PostLandView.as_view()),
    path('property/house/all/',views.HouseListView.as_view()),
    path('property/land/all/',views.LandListView.as_view(),name="land_list_view"),
    path('property/house/<int:pk>/',views.RetriveHouseView.as_view(),name="retrive_house"),
    path('property/land/<int:pk>/',views.RetriveLandView.as_view(),name="retrive_land"),
    path('list-for-keys/',views.ListHouseTypeView.as_view()),
    path('list-user-house/',views.ListUserHouseView.as_view(),name="list_user_house"),
    path('list-user-land/',views.ListUserLandView.as_view(),name="list_user_house"),
    path('property/house/<str:lis_type>/',views.ListHouseByKwarg.as_view()),
    path('property/land/<str:lis_type>/',views.ListLandByKwarg.as_view()),
    path('retrive-user-house-by-id/<int:pk>/',views.RetriveUserHouseView.as_view()),
    path('retrive-user-land-by-id/<int:pk>/',views.RetriveUserLandView.as_view()),
    ##update property status
    path('update-house-status/<int:pk>/',views.UpdateHouseStatus.as_view(),name="update_house_status"),
    path('update-land-status/<int:pk>/',views.UpdateLandStatus.as_view(),name="update_house_status"),
]