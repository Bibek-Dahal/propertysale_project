# Generated by Django 4.0.1 on 2022-03-23 09:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('p_sale', '0002_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='houseownercertificate',
            name='certificate_name',
            field=models.CharField(max_length=30, null=True),
        ),
        migrations.AddField(
            model_name='landownercertificate',
            name='certificate_name',
            field=models.CharField(max_length=30, null=True),
        ),
    ]
