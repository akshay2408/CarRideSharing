from rest_framework.authtoken import views as auth_views
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from rest_framework import generics, viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.authtoken import views as auth_views
from rest_framework.decorators import authentication_classes, permission_classes, api_view
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from .serializers import (UserSerializer, ContactSerializer,
                          RegisterSerializer, ClientSerializer,
                          DriverSerializer, RideRequestSerializer,
                          ClientInfoSerializer, DriverInfoSerializer)
from apis.models import Profile, Contact, Client, Driver, Address, RideRequest
from django.views.decorators.csrf import csrf_exempt
from rest_framework.viewsets import ModelViewSet
from rest_framework import status
from rest_framework import viewsets
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404


class ObtainAuthToken(auth_views.ObtainAuthToken):
    """
    Get auth-token
    """
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key,'username':user.username})

obtain_auth_token = ObtainAuthToken.as_view()

class UserChangePassword(generics.UpdateAPIView):
    """
    Change password
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'username'

@permission_classes((AllowAny,))
class ClientProfile(viewsets.ViewSet):
    """
    Client/Driver registrations and informations
    """
    def get_serializer_class(self,request):
        """
        """
        if request.data.get('user_type') == '1':
            return ClientSerializer
        if request.data.get('user_type') == '2':
            return DriverSerializer
        return serializers.Default

    def get_user_instance(self, request):
        """
        """
        try:
            client=request.user.client
            return {'client':client}
        except Exception as e:
            driver = request.user.driver
            return {'driver':driver}

    def create(self, request, *args, **kwargs):
        """
        Create Client profile
        """
        ser=self.get_serializer_class(request)
        serializer = ser(data=request.data, context={'request': request})
        if serializer.is_valid(raise_exception=True):
            data = serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        """
        Show client data
        """
        user_name = self.get_user_instance(request)
        driver=user_name.get('driver')
        client=user_name.get('client')
        if driver:
            user=DriverInfoSerializer(driver)
        if client:
            user=ClientInfoSerializer(client)
        content = {'status': status.HTTP_200_OK, 'user': user.data}
        return Response(content)

class RideRequestPlace(viewsets.ViewSet):
    """
    make ride request or place
    """
    serializer_class = RideRequestSerializer
    def get_user_instance(self, request):
        try:
            client=request.user.client
            return {'client':client}
        except Exception as e:
            driver = request.user.driver
            return {'driver':driver}

    def list(self, request):
        """
        Show all list
        """
        driver_request = RideRequest.objects.filter(client_id__isnull=True)
        client_request = RideRequest.objects.filter(driver_id__isnull=True)
        serializer1 = self.serializer_class(driver_request, many=True)
        serializer2 = self.serializer_class(client_request, many=True)
        Serializer_list = [serializer1.data, serializer2.data]
        content = {
        'status': status.HTTP_200_OK,
        'driver': serializer1.data,
        'client' : serializer2.data,

        }
        return Response(content)

    def create(self, request, *args, **kwargs):
        """
        Make ride request or place
        """
        user_name = self.get_user_instance(request)
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            ride = serializer.save()
            driver = user_name.get('driver')
            client = user_name.get('client')
            if driver:
                ride.driver = driver
                ride.save()
            if client:
                 ride.client = client
                 ride.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@permission_classes((AllowAny,))
class ContactUs(ModelViewSet):
    """
    """
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

