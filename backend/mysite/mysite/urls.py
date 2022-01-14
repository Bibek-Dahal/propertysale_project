
from allauth.socialaccount.providers import google
from django.contrib import admin
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from django.urls.conf import include
from allauth.urls import prov_urlpatterns

from user_account.social_login import GoogleLogin
from dj_rest_auth.views import (
    PasswordResetConfirmView,
)
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/',include('api.urls',namespace='api')),
    path('accounts/', include('allauth.urls')),
    path('account/password/reset/confirm/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('dj-rest-auth/google/', GoogleLogin.as_view(), name='google_login')
]
urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
