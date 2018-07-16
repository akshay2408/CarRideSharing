from django.test import TestCase
import json
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from rest_framework.authtoken.models import Token
from django.test import TestCase
from apis.test_factories import UserFactory, ClientFactory, DriverFactory, AddressFactory, RideRequestFactory, ContactFactory
from rest_framework.authtoken.models import Token
import datetime
from rest_framework.test import APIRequestFactory

class UserTest(TestCase):
    """
    Test for custom log in for Superuser
    """
    def setUp(self):
        self.factory = APIRequestFactory()
        self.user = UserFactory(username='aks1', password='secret')
        self.token = Token.objects.create(user=self.user)
        self.token.save()

    def test_login(self):
        """
        """

        user1 = UserFactory(username='test_data')
        user1.set_password('198412')
        user1.save()
        client = APIClient()
        response = client.post('/api/v1/auth-token/', {'username': 'test_data', 'password': '198412'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response = client.post('/api/v1/auth-token/', {'username': 'cyz', 'password': '198412'})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        # wrong password
        response = client.post('/api/v1/auth-token/', {'username': 'Akshay', 'password': 'tiger'})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_register(self):
        # Creating Client and driver
        client_data = {'username':'clientuser',
                  'email':'driver@xyz.com',
                  'first_name':'akshay',
                  'last_name':'Gupta',
                  'password':'tiger',
                  'phone_number':'8888888888',
                  'user_type':1,
                  'clientIdentification':'xyz22xD1'}

        driver_data = {'username':'driveruser',
                  'email':'driver@xyz.com',
                  'first_name':'akshay',
                  'last_name':'Gupta',
                  'password':'tiger',
                  'phone_number':'8888888888',
                  'user_type':2,
                  'clientIdentification':'xyz22xD1',
                  'driver_license':'xyz32d32',
                  'car_model':'Honda City',
                  'car_makes':'Honda',
                  'car_year':'2017-09-12'}
        client = APIClient()
        response = client.post('/api/v1/client-register/',client_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        response = client.post('/api/v1/client-register/',driver_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_contacus(self):
        # changing Superuser authentication does not effect staff authentication
        # auth-token is failing without UserProfile
        data={
              'name':'Jhon',
              'phone_number':'+91896213131',
              'email':'jhon@gmail.com',
              'message':'i would like to talk with you'}
        client = APIClient()
        response = client.post('/api/v1/contact/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_request_place_ride(self):
        """
         Request/Place a ride
        """
        self.client.force_login(user=self.user)
        client=ClientFactory(user=self.user, user_type=1)
        ride={'start_ride':'delhi',
              'end_ride':'mumbai',
              'place':'delhi',
              'date': '2000-01-01 12:00:00Z',
              'cost':'291',
              'seats':'3'}
        client = APIClient()
        response = client.post('/api/v1/rides/',ride, HTTP_AUTHORIZATION='Token {}'.format(str(self.token)))
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_all_rides(self):
      """
       Here get all rides
      """
      self.client.force_login(user=self.user)
      client=ClientFactory(user=self.user, user_type=1)
      client = APIClient()
      response = client.get('/api/v1/rides/', HTTP_AUTHORIZATION='Token {}'.format(str(self.token)))
      self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_show_user_profile(self):
      """
      Show client Profile
      """
      self.client.force_login(user=self.user)
      client=ClientFactory(user=self.user, user_type=1)
      client = APIClient()
      response = client.get('/api/v1/profile/2/', HTTP_AUTHORIZATION='Token {}'.format(str(self.token)))
      self.assertEqual(response.status_code, status.HTTP_200_OK)







