from rest_framework import permissions
from p_sale.models import KYC

class PostPropertyPermission(permissions.BasePermission):
    """
    check if user KYC is verified
    if not then user will not be allowed to post property
    """
    def has_permission(self, request, view):
        try:
            kyc_obj = KYC.objects.get(user=request.user)
        
            if not kyc_obj.status.kyc_status == 'verified':
                return False
            return True
        except:
            return False
        