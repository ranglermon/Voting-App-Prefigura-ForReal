# Generated by Django 2.1.3 on 2018-12-06 08:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vote', '0005_vote'),
    ]

    operations = [
        migrations.AddField(
            model_name='vote',
            name='Vote_Value',
            field=models.CharField(default='', max_length=200),
        ),
    ]
