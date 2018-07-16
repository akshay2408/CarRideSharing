from django.contrib import admin
from .models import Client, Driver, Address, RideRequest, Contact
# Register your models here.
admin.site.register(Client)
admin.site.register(Driver)
admin.site.register(Address)
admin.site.register(RideRequest)
admin.site.register(Contact)
