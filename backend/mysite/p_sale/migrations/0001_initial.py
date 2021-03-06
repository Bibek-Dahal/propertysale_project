# Generated by Django 4.0.1 on 2022-03-01 08:43

import autoslug.fields
import cloudinary.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AdditionalHouseImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', cloudinary.models.CloudinaryField(blank=True, max_length=255, null=True, verbose_name='image')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='AdditionalLandImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', cloudinary.models.CloudinaryField(blank=True, max_length=255, null=True, verbose_name='image')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='AreaType',
            fields=[
                ('area', models.CharField(max_length=30, primary_key=True, serialize=False, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='ContactNum',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mobile_num', models.PositiveIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='FaceTowards',
            fields=[
                ('face_towards', models.CharField(max_length=100, primary_key=True, serialize=False, unique=True)),
            ],
            options={
                'verbose_name': 'face towards',
                'verbose_name_plural': 'face towards',
            },
        ),
        migrations.CreateModel(
            name='Facility',
            fields=[
                ('facility', models.CharField(max_length=200, primary_key=True, serialize=False, unique=True)),
            ],
            options={
                'verbose_name': 'facility',
                'verbose_name_plural': 'facilities',
            },
        ),
        migrations.CreateModel(
            name='FurnishingType',
            fields=[
                ('furnishing_type', models.CharField(max_length=150, primary_key=True, serialize=False, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='House',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('slug', autoslug.fields.AutoSlugField(editable=False, populate_from='title')),
                ('description', models.TextField(blank=True)),
                ('road_to_property', models.CharField(blank=True, max_length=300)),
                ('access_road', models.CharField(blank=True, max_length=80)),
                ('district', models.CharField(max_length=30)),
                ('zone', models.CharField(max_length=30)),
                ('zip', models.PositiveIntegerField(blank=True, default=0)),
                ('landmark', models.CharField(blank=True, max_length=200)),
                ('ropani', models.PositiveSmallIntegerField(default=0)),
                ('aana', models.PositiveSmallIntegerField(default=0)),
                ('paisa', models.PositiveSmallIntegerField(default=0)),
                ('daam', models.PositiveSmallIntegerField(default=0)),
                ('price_in_number', models.PositiveIntegerField()),
                ('price_in_words', models.CharField(max_length=200)),
                ('price_negotiable', models.CharField(choices=[('Yes', 'Yes'), ('No', 'No')], default='No', max_length=3)),
                ('main_image', cloudinary.models.CloudinaryField(max_length=255, verbose_name='main_image')),
                ('latitude', models.FloatField()),
                ('longitude', models.FloatField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('no_of_views', models.PositiveIntegerField(default=0)),
                ('is_active', models.BooleanField(default=False)),
                ('on_sale', models.BooleanField(default=True)),
                ('floors', models.PositiveSmallIntegerField(default=0)),
                ('beds', models.PositiveSmallIntegerField(default=0)),
                ('kitchen', models.PositiveSmallIntegerField(default=0)),
                ('living', models.PositiveSmallIntegerField(default=0)),
                ('bath', models.PositiveSmallIntegerField(default=0)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='HouseOwnerCertificate',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('certificate_image', cloudinary.models.CloudinaryField(max_length=255, verbose_name='certificate_image')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='HouseType',
            fields=[
                ('house_type', models.CharField(max_length=100, primary_key=True, serialize=False, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='KYC',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('profile_pic', cloudinary.models.CloudinaryField(max_length=255, verbose_name='profile')),
                ('citizenship_photo_front', cloudinary.models.CloudinaryField(max_length=255, verbose_name='citizenship_front')),
                ('citizenship_photo_back', cloudinary.models.CloudinaryField(max_length=255, verbose_name='citizenship_back')),
                ('occupation', models.CharField(blank=True, max_length=150)),
                ('citizenship_num', models.SlugField(max_length=40)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='KYCStatus',
            fields=[
                ('kyc_status', models.CharField(max_length=40, primary_key=True, serialize=False, unique=True)),
            ],
            options={
                'verbose_name': 'kyc status',
                'verbose_name_plural': 'kyc status',
            },
        ),
        migrations.CreateModel(
            name='Land',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('slug', autoslug.fields.AutoSlugField(editable=False, populate_from='title')),
                ('description', models.TextField(blank=True)),
                ('road_to_property', models.CharField(blank=True, max_length=300)),
                ('access_road', models.CharField(blank=True, max_length=80)),
                ('district', models.CharField(max_length=30)),
                ('zone', models.CharField(max_length=30)),
                ('zip', models.PositiveIntegerField(blank=True, default=0)),
                ('landmark', models.CharField(blank=True, max_length=200)),
                ('ropani', models.PositiveSmallIntegerField(default=0)),
                ('aana', models.PositiveSmallIntegerField(default=0)),
                ('paisa', models.PositiveSmallIntegerField(default=0)),
                ('daam', models.PositiveSmallIntegerField(default=0)),
                ('price_in_number', models.PositiveIntegerField()),
                ('price_in_words', models.CharField(max_length=200)),
                ('price_negotiable', models.CharField(choices=[('Yes', 'Yes'), ('No', 'No')], default='No', max_length=3)),
                ('main_image', cloudinary.models.CloudinaryField(max_length=255, verbose_name='main_image')),
                ('latitude', models.FloatField()),
                ('longitude', models.FloatField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('no_of_views', models.PositiveIntegerField(default=0)),
                ('is_active', models.BooleanField(default=False)),
                ('area', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='p_sale.areatype')),
                ('face_towards', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='p_sale.facetowards')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='ListingConditioin',
            fields=[
                ('listing_condition', models.CharField(max_length=100, primary_key=True, serialize=False, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='ListingType',
            fields=[
                ('listing_type', models.CharField(max_length=100, primary_key=True, serialize=False, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='PropertyStatus',
            fields=[
                ('status', models.CharField(max_length=40, primary_key=True, serialize=False, unique=True)),
            ],
            options={
                'verbose_name': 'property status',
                'verbose_name_plural': 'property status',
            },
        ),
        migrations.CreateModel(
            name='PropertyType',
            fields=[
                ('type', models.CharField(max_length=100, primary_key=True, serialize=False, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='LandOwnerCertificate',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('certificate_image', cloudinary.models.CloudinaryField(max_length=255, verbose_name='certificate_image')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('land', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='p_sale.land')),
            ],
        ),
        migrations.AddField(
            model_name='land',
            name='listing_type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='p_sale.listingtype'),
        ),
    ]
