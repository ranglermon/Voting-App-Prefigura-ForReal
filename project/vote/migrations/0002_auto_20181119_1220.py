# Generated by Django 2.1.3 on 2018-11-19 11:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vote', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='election',
            name='Election_Creator',
            field=models.CharField(default='', max_length=200),
        ),
    ]
