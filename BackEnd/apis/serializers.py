from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Profile, Client, Driver, Address, RideRequest, Contact

class UserSerializer(serializers.ModelSerializer):
    """
    A serializer for the User model so that we can change passwords from the client
    """
    class Meta:
        model = User
        fields = ('username', 'password')

    def update(self, instance, validated_data):
        print('update called ' + str(instance))
        for attr, value in validated_data.items():
            print('a: ' + str(attr) + ' v: ' + str(value))
            if attr == 'password':
                instance.set_password(value)
            else:
                setattr(instance, attr, value)
        instance.save()
        return instance

class RegisterSerializer(serializers.Serializer):
    """
    Register page
    """
    username = serializers.CharField(source='user.username')
    email = serializers.CharField(source='user.email')
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    password = serializers.CharField(source='user.password')
    phone_number =  serializers.CharField(source='profile.phone_number')
    user_type = serializers.CharField(source='profile.user_type')
    class Meta:
        model = Profile
        fields = ('username','first_name','last_name', 'email', 'password', 'phone_number', 'user_type')

class ClientSerializer(RegisterSerializer):
    class Meta:
        model = Client
        fields = ('id', 'clientIdentification')

    def create(self, validated_data):
        userData = validated_data.get('user')
        user = User(**userData)
        user.set_password(userData.get('password'))
        user.save()
        profile=validated_data.get('profile')
        data = self.context.get('request')._data
        cID = data.get('clientIdentification')
        return Client.objects.create(user=user,clientIdentification=cID, **profile )

class DriverSerializer(RegisterSerializer):
    class Meta:
        model = Driver
        fields = ('id', 'driver_license', 'car_model', 'car_makes', 'car_year')

    def create(self, validated_data):
        userData = validated_data.get('user')
        user = User(**userData)
        user.set_password(userData.get('password'))
        user.save()
        profile = validated_data.get('profile')
        data = self.context.get('request')._data
        car_year = data.get('car_year')
        driver_license = data.get('driver_license')
        car_model = data.get('car_model')
        car_makes = data.get('car_makes')
        return Driver.objects.create(user=user, car_year=car_year, driver_license=driver_license, car_model=car_model,
                                     car_makes=car_makes, **profile)



class ContactSerializer(serializers.ModelSerializer):
  class Meta:
    model = Contact
    fields = ('id', 'name', 'phone_number', 'email', 'message')


class RideRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = RideRequest
        fields = ('id', 'start_ride', 'end_ride', 'place', 'date', 'no_of_seates', 'cost' )


class CommonBaseSerializer(serializers.Serializer):
    username = serializers.CharField(source='user.username')
    email = serializers.CharField(source='user.email')
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')

class ClientInfoSerializer(serializers.ModelSerializer, CommonBaseSerializer):
    class Meta:
        model = Client
        fields= ('username','email','first_name','last_name','phone_number',
            'user_type','clientIdentification')

class DriverInfoSerializer(serializers.ModelSerializer, CommonBaseSerializer):
    class Meta:
        model = Driver
        fields= ('username','email','first_name','last_name','phone_number',
            'user_type','driver_license', 'car_model', 'car_makes', 'car_year')

