# Generated by Django 2.1.5 on 2019-04-01 10:37

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('vote', '0015_auto_20190304_1232'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vote',
            name='Vote_Owner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='votes', to=settings.AUTH_USER_MODEL),
        ),
    ]
