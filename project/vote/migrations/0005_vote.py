# Generated by Django 2.1.3 on 2018-12-01 19:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vote', '0004_auto_20181122_1141'),
    ]

    operations = [
        migrations.CreateModel(
            name='Vote',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Vote_Owner', models.CharField(default='', max_length=200)),
                ('Election_Id', models.CharField(default='', max_length=200)),
                ('Election_Method', models.CharField(default='', max_length=50)),
            ],
        ),
    ]