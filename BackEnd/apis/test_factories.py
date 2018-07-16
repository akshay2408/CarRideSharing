import factory
from apis.models import Client, Driver, Address, RideRequest, Contact
from django.contrib.auth.models import User

class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    username = factory.Faker('name')

class ClientFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Client


class DriverFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Driver


class AddressFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Address


class RideRequestFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = RideRequest

class ContactFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Contact
