from django.urls import path
from django.urls.conf import include
from .import views
from dj_rest_auth.registration.views import VerifyEmailView,ConfirmEmailView
from dj_rest_auth.views import PasswordResetView


app_name = 'api'
urlpatterns = [
    #retrive all user
    path('user/',views.UserListView.as_view(),name="user_all"),
    #Login Logout passwd change
    path('account/', include('dj_rest_auth.urls')),
    path('account/registration/account-confirm-email/<str:key>/',ConfirmEmailView.as_view()),
    #user registration
    path('account/registration/', include('dj_rest_auth.registration.urls')),
    path('account/account-confirm-email/',VerifyEmailView.as_view(),name='account_email_verification_sent'),
    path('account/password/reset/', PasswordResetView.as_view(), name='account_password_reset'),    
]