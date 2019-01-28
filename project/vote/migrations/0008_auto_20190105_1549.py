# Generated by Django 2.1.3 on 2019-01-05 14:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vote', '0007_vote_alternative_voted_on'),
    ]

    operations = [
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Election_Id', models.CharField(default='', max_length=200)),
                ('Question_Id', models.IntegerField(default=0)),
                ('Question_Wording', models.TextField(default='')),
            ],
        ),
        migrations.AddField(
            model_name='alternative',
            name='Question_Id',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='election',
            name='Active_Question',
            field=models.IntegerField(default=0),
        ),
    ]
