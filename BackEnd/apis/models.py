from django.db import models
from django.contrib.auth.models import User, Group


class Profile(models.Model):
    """
    """
    USER_CHOICES = (
    (1, "Client"),
    (2, "Driver"),
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=100, null=True)
    photo = models.ImageField(upload_to = 'document/', default = 'document/None/no-img.jpg')
    user_type = models.IntegerField(choices=USER_CHOICES)
    class Meta:
        abstract=True
 # related_name="%(class)s"

class Client(Profile):
    #
    #
    #
    clientIdentification = models.CharField(max_length=100, null=True, blank=True)

class Driver(Profile):
    """
    """
    driver_license  = models.CharField(max_length=100, null=True, blank=True)
    car_model = models.CharField(max_length=100, null=True, blank=True)
    car_makes = models.CharField(max_length=100, null=True,blank=True)
    car_year  = models.DateField(null=True, blank=True)


class Address(models.Model):
    """
    """

    client = models.ForeignKey(Client, null=True, blank=True, on_delete=models.SET_NULL)
    driver = models.ForeignKey(Driver, null=True, blank=True, on_delete=models.SET_NULL)
    address1 = models.CharField(max_length=1024, null=True, blank=True)
    address2 = models.CharField(max_length=1024, null=True, blank=True)
    zip_code = models.CharField(max_length=12, null=True, blank=True)
    city = models.CharField(max_length=1024, null=True, blank=True)
    country = models.CharField(max_length=100, null=True, blank=True)


class RideRequest(models.Model):
    """
    """
    client = models.ForeignKey(Client, null=True, blank=True, on_delete=models.SET_NULL)
    driver = models.ForeignKey(Driver, null=True, blank=True, on_delete=models.SET_NULL)
    start_ride = models.CharField(max_length=1024, null=True, blank=True)
    end_ride = models.CharField(max_length=1024, null=True, blank=True)
    place = models.CharField(max_length=1024, null=True, blank=True)
    date = models.DateTimeField(null=True, blank=True)
    no_of_seates = models.IntegerField(null=True, blank=True)
    cost = models.IntegerField(null=True, blank=True)


class Contact(models.Model):
    """
    """
    name = models.CharField(max_length=300)
    phone_number = models.IntegerField(null=True, blank=True)
    email = models.CharField(max_length=200)
    message = models.CharField(max_length=1024, null=True, blank=True)

