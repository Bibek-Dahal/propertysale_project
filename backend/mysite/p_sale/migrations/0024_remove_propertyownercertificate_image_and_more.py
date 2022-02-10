# Generated by Django 4.0.1 on 2022-01-21 16:20

import cloudinary.models
from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('p_sale', '0023_alter_property_bath_alter_property_beds_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='propertyownercertificate',
            name='image',
        ),
        migrations.AddField(
            model_name='propertyownercertificate',
            name='certificate_image',
            field=cloudinary.models.CloudinaryField(default=django.utils.timezone.now, max_length=255, verbose_name='certificate_image'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='additionalpropertyimage',
            name='image',
            field=cloudinary.models.CloudinaryField(blank=True, max_length=255, null=True, verbose_name='image'),
        ),
        migrations.AlterField(
            model_name='property',
            name='listing_type',
            field=models.CharField(choices=[('Top Listing', 'Top Listing Rs.23600'), ('Premium Listing', 'Premium Listing Rs.17600'), ('Featured Listing', 'Featured Listing Rs.9600')], max_length=100),
        ),
    ]
