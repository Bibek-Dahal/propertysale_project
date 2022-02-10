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
     
]