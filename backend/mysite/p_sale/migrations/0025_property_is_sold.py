# Generated by Django 4.0.1 on 2022-01-24 10:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('p_sale', '0024_remove_propertyownercertificate_image_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='property',
            name='is_sold',
            field=models.BooleanField(default=False),
        ),
    ]
