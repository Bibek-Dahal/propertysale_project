
from allauth.socialaccount.providers import google
from django.contrib import admin
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from django.urls.conf import include
from allauth.urls import prov_urlpatterns
from dj_rest_auth.registration.views import VerifyEmailView,ConfirmEmailView
from user_account.social_login import GoogleLogin,FacebookLogin
from allauth.socialaccount.views import *
from dj_rest_auth.views import (
    PasswordResetConfirmView,
)
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/',include('api.urls',namespace='api')),
    path('account/password/reset/confirm/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('dj-rest-auth/google/', GoogleLogin.as_view(), name='google_login'),
    path('confirm-email/<str:key>/',ConfirmEmailView.as_view(),name="account_confirm_email",),
    path('confirm-email/',VerifyEmailView.as_view(),name='account_email_verification_sent'),
    path('dj-rest-auth/facebook/',FacebookLogin.as_view(),name="fb_login"),
    # social account
     path("login/cancelled/",
        login_cancelled,
        name="socialaccount_login_cancelled",
    ),
    path("login/error/", login_error, name="socialaccount_login_error"),
    path("connections/",connections, name="socialaccount_connections"),
]
urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
