# Generated by Django 2.0.7 on 2018-07-09 15:35

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address1', models.CharField(blank=True, max_length=1024, null=True)),
                ('address2', models.CharField(blank=True, max_length=1024, null=True)),
                ('zip_code', models.CharField(blank=True, max_length=12, null=True)),
                ('city', models.CharField(blank=True, max_length=1024, null=True)),
                ('country', models.CharField(blank=True, max_length=100, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Client',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('phone_number', models.CharField(max_length=100, null=True)),
                ('photo', models.ImageField(default='document/None/no-img.jpg', upload_to='document/')),
                ('user_type', models.IntegerField(choices=[(1, 'Client'), (2, 'Driver')])),
                ('clientIdentification', models.CharField(blank=True, max_length=100, null=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Contact',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=300)),
                ('phone_number', models.IntegerField(blank=True, null=True)),
                ('email', models.CharField(max_length=200)),
                ('message', models.CharField(blank=True, max_length=1024, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Driver',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('phone_number', models.CharField(max_length=100, null=True)),
                ('photo', models.ImageField(default='document/None/no-img.jpg', upload_to='document/')),
                ('user_type', models.IntegerField(choices=[(1, 'Client'), (2, 'Driver')])),
                ('driver_license', models.CharField(blank=True, max_length=100, null=True)),
                ('car_model', models.CharField(blank=True, max_length=100, null=True)),
                ('car_makes', models.CharField(blank=True, max_length=100, null=True)),
                ('car_year', models.DateTimeField(blank=True, null=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='RideRequest',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_ride', models.CharField(blank=True, max_length=1024, null=True)),
                ('end_ride', models.CharField(blank=True, max_length=1024, null=True)),
                ('place', models.CharField(blank=True, max_length=1024, null=True)),
                ('date', models.DateTimeField(blank=True, null=True)),
                ('no_of_seates', models.IntegerField(blank=True, null=True)),
                ('cost', models.IntegerField(blank=True, null=True)),
                ('client', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='apis.Client')),
                ('driver', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='apis.Driver')),
            ],
        ),
        migrations.AddField(
            model_name='address',
            name='client',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='apis.Client'),
        ),
        migrations.AddField(
            model_name='address',
            name='driver',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='apis.Driver'),
        ),
    ]