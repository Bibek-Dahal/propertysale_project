# Generated by Django 4.0.1 on 2022-03-23 13:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('p_sale', '0007_alter_house_url_alter_land_url'),
    ]

    operations = [
        migrations.AlterField(
            model_name='house',
            name='beds',
            field=models.CharField(default=1, max_length=3),
        ),
        migrations.AlterField(
            model_name='house',
            name='floors',
            field=models.CharField(default=1, max_length=3),
        ),
        migrations.AlterField(
            model_name='house',
            name='kitchen',
            field=models.CharField(default=1, max_length=3),
        ),
        migrations.AlterField(
            model_name='house',
            name='living',
            field=models.CharField(default=1, max_length=3),
        ),
    ]