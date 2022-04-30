from django.http import Http404
from requests import request
from api.custom_permission import PostPropertyPermission
from .serializer import *
from rest_framework.generics import ListAPIView,RetrieveAPIView
from user_account.models import MyUser as User
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import filters
from rest_framework.parsers import FormParser,MultiPartParser,JSONParser
from p_sale.models import *
from django.shortcuts import get_object_or_404



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class UserListView(ListAPIView):
    queryset = User.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer

class RetriveUserView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
        queryset = User.objects.get(username=self.request.user)
        serializer = UserSerializer(queryset)
        if KYC.objects.filter(user=self.request.user).exists():
            kyc_status = KYC.objects.get(user=self.request.user).status.kyc_status
            new_serializer = serializer.data
            new_serializer['kyc_status']=kyc_status
            print(new_serializer)
            return Response(new_serializer)
        new_serializer = serializer.data
        new_serializer['kyc_status']=None
        return Response(new_serializer,status=status.HTTP_200_OK)

class UpdateUserView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
        queryset = User.objects.get(username=self.request.user)
        serializer = UserSerializer(queryset)
        return Response(serializer.data)
        
    def patch(self, request, format=None):
        user = User.objects.get(username=self.request.user)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CreateKycView(APIView):
    parser_classes = [MultiPartParser,FormParser]
    permission_class = [IsAuthenticated]
    def post(self,request):
        kyc_serializer = KycSerializer(data = request.data)
        contact_serializer = UserContactSerializer(data=request.data)
        
        if kyc_serializer.is_valid(raise_exception=True) and contact_serializer.is_valid(raise_exception=True):
            # if contact_serializer.is_valid():
                kyc_obj = kyc_serializer.save()
                contact_serializer.save(kyc_id=kyc_obj)
                return Response(kyc_serializer.data,status=status.HTTP_201_CREATED)
            # return Response(contact_serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        # return Response(kyc_serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        
class RetriveKycView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
        try:
            print(KYC.objects.get(user=request.user))
            print(request.user)
            queryset = KYC.objects.get(user=request.user)
            serializer = KycSerializer(queryset)
            return Response(serializer.data,status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"detail":"KYC doesnot exists."},status=status.HTTP_404_NOT_FOUND)

class UpdateUserKycView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser,FormParser]
    
    def patch(self, request, format=None):
        try:
            user = KYC.objects.get(user=self.request.user)
            serializer = UpdateKycSerializer(user, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({"detail":"KYC doesnot exists."},status=status.HTTP_404_NOT_FOUND)

class PostHouseView(APIView):
    parser_classes = [MultiPartParser,FormParser]
    permission_classes = [IsAuthenticated,PostPropertyPermission]

    def post(self,request,*args,**kwargs):
        house_serializer = HouseSerializer(data=request.data,context={'user':request.user})
        house_img_serializer = HouseOwnerCertificateSerializer(data=request.data)
        images = request.FILES.getlist('additional_house_image')
        certificate_images = request.FILES.getlist('certificate_image')
        print(certificate_images)
        
        print(images)
        if house_serializer.is_valid():
            if house_img_serializer.is_valid():
                obj = house_serializer.save()
                if images:
                    for img in images:
                       addtional_img = AdditionalHouseImage(house=obj,image=img)
                       addtional_img.save()
                # print(house_img_serializer.data)
                for i in certificate_images:
                    addtional_cert_img = HouseOwnerCertificate(house=obj,certificate_image=i)
                    addtional_cert_img.save()
                return Response(house_serializer.data,status = status.HTTP_201_CREATED)
            return Response(house_img_serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        return Response(house_serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class PropertyListView(ListAPIView):
    queryset = Land.properties.all()
    serializer_class = LandSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['title']

class PostLandView(APIView):
    parser_classes = [MultiPartParser,FormParser]
    permission_classes = [IsAuthenticated,PostPropertyPermission]

    def post(self,request,*args,**kwargs):
        land_serializer = LandSerializer(data=request.data,context={'user':request.user})
        land_img_serializer = LandOwnerCertificateSerializer(data=request.data)
        images = request.FILES.getlist('additional_land_image')
        certificate_images = request.FILES.getlist('certificate_image')
        print(images)
        if land_serializer.is_valid():
            if land_img_serializer.is_valid():
                obj = land_serializer.save()
                print(obj)
                obj.save()
                """check if additional images is present"""
                if images:
                    for img in images:
                       addtional_img = AdditionalLandImage(land=obj,image=img)
                       addtional_img.save()
                for i in certificate_images:
                    addtional_cert_img = LandOwnerCertificate(land=obj,certificate_image=i)
                    addtional_cert_img.save()
                return Response(land_serializer.data,status = status.HTTP_201_CREATED)
            return Response(land_img_serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        return Response(land_serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class HouseListView(ListAPIView):
    queryset = House.properties.all()
    serializer_class = HouseSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'longitude','latitude']
    # ordering_fields = ['price_in_number']

    def get_queryset(self):
        q = self.request.query_params.get('ordering')
        if q:
            if q == 'price':
                return super().get_queryset().order_by('price_in_number')
            elif q == '-price':
                return super().get_queryset().order_by('-price_in_number')
        return super().get_queryset()
            

class LandListView(ListAPIView):
    queryset = Land.properties.all()
    serializer_class = LandSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'longitude','latitude']

    def get_queryset(self):
        q = self.request.query_params.get('ordering')
        if q:
            if q == 'price':
                return super().get_queryset().order_by('price_in_number')
            elif q == '-price':
                return super().get_queryset().order_by('-price_in_number')
        return super().get_queryset()
        
class RetriveHouseView(RetrieveAPIView):
    queryset = House.properties.all()
    serializer_class = HouseSerializer

class RetriveLandView(RetrieveAPIView):
    queryset = Land.properties.all()
    serializer_class = LandSerializer

class ListHouseTypeView(APIView):
    def get(self,request):
        """
        instead of keeping separate url for all simply making one url
        """
        try:
            house_type_queryset = HouseType.objects.all()
            property_type_queryset = PropertyType.objects.all()
            facility_queryset = Facility.objects.all()
            area_type_queryset = AreaType.objects.all()
            listing_type_queryset = ListingType.objects.all()
            listing_condition_queryset = ListingConditioin.objects.all()
            furnishing_type_queryset = FurnishingType.objects.all()
            face_towards_queryset = FaceTowards.objects.all()

            house_type = [house.house_type for house in house_type_queryset]
            property_type = [ptype.type for ptype in property_type_queryset]
            facility = [facility.facility for facility in facility_queryset]
            area_type = [area.area for area in area_type_queryset]
            listing_type = [listype.listing_type for listype in listing_type_queryset]
            listing_condition = [lis_con.listing_condition for lis_con in listing_condition_queryset]
            furnishing_type = [fur_type.furnishing_type for fur_type in furnishing_type_queryset]
            face_towards = [f_towards.face_towards for f_towards in face_towards_queryset]
            print(house_type)

            context = {
                'house_type':house_type,
                'property_type':property_type,
                'facility':facility,
                'area_type':area_type,
                'listing_type':listing_type,
                'listing_condition':listing_condition,
                'furnishing_type':furnishing_type,
                'face_towards':face_towards
            }
            return Response(context,status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error":"something went wrong"},status=status.HTTP_400_BAD_REQUEST)

class ListUserHouseView(ListAPIView):
    permision_classes = [IsAuthenticated]
    queryset = House.objects.all()
    serializer_class = HouseSerializer

    def get_queryset(self):
        return super().get_queryset().filter(seller=self.request.user)


class ListUserLandView(ListUserHouseView):
    permision_classes = [IsAuthenticated]
    queryset = Land.objects.all()
    serializer_class = LandSerializer

    def get_queryset(self):
        return super().get_queryset().filter(seller=self.request.user)

"""
I am using This extra two views because of different model manager handeling different views
"""
class RetriveUserHouseView(RetrieveAPIView):
    permision_classes = [IsAuthenticated]
    # queryset = House.objects.all()
    serializer_class = HouseSerializer

    def get_queryset(self):
        print(type(self.kwargs.get('pk')))
        pk = self.kwargs.get('pk')
        try:
            obj = House.objects.get(id=pk)
            if obj.seller == self.request.user:
                return House.objects.filter(id=pk)
            raise Http404
        except:
            raise Http404

class RetriveUserLandView(RetrieveAPIView):
    permision_classes = [IsAuthenticated]
    serializer_class = LandSerializer

    def get_queryset(self):
        print(type(self.kwargs.get('pk')))
        pk = self.kwargs.get('pk')
        try:
            obj = Land.objects.get(id=pk)
            if obj.seller == self.request.user:
                return Land.objects.filter(id=pk)
            raise Http404
        except:
            raise Http404


class ListLandByKwarg(ListAPIView):
    queryset = Land.properties.all()
    serializer_class = LandSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'longitude','latitude']

    def get_queryset(self):
        q = super().get_queryset()
        query = self.request.query_params.get('ordering')
        if query:
            if query == 'price':
                q = super().get_queryset().order_by('price_in_number')
            elif query == '-price':
                q =  super().get_queryset().order_by('-price_in_number')

        search = self.kwargs.get('lis_type')
        try:
            if search == 'top-listing':
                return q.filter(listing_type=ListingType.objects.get(listing_type__icontains='Top Listing'))
            elif search == 'premium-listing':
                return q.filter(listing_type=ListingType.objects.get(listing_type__icontains='Premium Listing'))
            elif search == 'featured-listing':
                return q.filter(listing_type=ListingType.objects.get(listing_type__icontains='Featured Listing'))
            raise Http404
        except:
            raise Http404

        
class ListHouseByKwarg(ListAPIView):
    queryset = House.properties.all()
    serializer_class = HouseSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'longitude','latitude']

    def get_queryset(self):
        q = super().get_queryset()
        query = self.request.query_params.get('ordering')
        if query:
            if query == 'price':
                q = super().get_queryset().order_by('price_in_number')
            elif query == '-price':
                q =  super().get_queryset().order_by('-price_in_number')

        search = self.kwargs.get('lis_type')
        try:
            if search == 'house-for-sale':
                return q.filter(property_type=PropertyType.objects.get(type__icontains='House For Sale'))
            elif search == 'house-for-rent':
                return q.filter(property_type=PropertyType.objects.get(type__icontains='House For Rent'))
            elif search == 'top-listing':
                return q.filter(listing_type=ListingType.objects.get(listing_type__icontains='Top Listing'))
            elif search == 'premium-listing':
                return q.filter(listing_type=ListingType.objects.get(listing_type__icontains='Premium Listing'))
            elif search == 'featured-listing':
                return q.filter(listing_type=ListingType.objects.get(listing_type__icontains='Featured Listing'))
            raise Http404
        except:
            raise Http404

        
        
class UpdateHouseStatus(APIView):
    permission_classes = [IsAuthenticated]
    def put(self, request,*args,**kwargs):
        house = get_object_or_404(House,id=self.kwargs.get('pk'))
        serializer = UpdateHouseStatusSerializer(house,data=request.data)
        if house.seller == self.request.user:
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data,status=status.HTTP_200_OK)
        raise Http404
        
class UpdateLandStatus(APIView):
    permission_classes = [IsAuthenticated]
    def put(self, request,*args,**kwargs):
        land = get_object_or_404(Land,id=self.kwargs.get('pk'))
        serializer = UpdateLandStatusSerializer(land,data=request.data)
        if land.seller == self.request.user:
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data,status=status.HTTP_200_OK)
        raise Http404


class RetriveUserByIdView(RetrieveAPIView):
    queryset = User.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer

