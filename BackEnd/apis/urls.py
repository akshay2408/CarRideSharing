from django.urls import path, include
from . import api_views
from rest_framework.routers import DefaultRouter
app_name = 'apis'

urlpatterns = [
    path('client-register/', api_views.ClientProfile.as_view({"post": "create"}), name='ClientProfile'),
    path('contact/', api_views.ContactUs.as_view({"get": "list", "post": "create", "put": "update", "patch": "partial_update", "delete": "destroy"}), name='ContactUs'),
    path('rides/', api_views.RideRequestPlace.as_view({"get": "list", "post": "create"}), name='RideRequestPlace'),
    path('profile/<pk>/', api_views.ClientProfile.as_view({'get': 'retrieve'}), name='ClientProfile'),
]
