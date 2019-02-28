from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Election(models.Model):
    Election_Id = models.CharField(default = " ", max_length=200)
    Election_Creator = models.CharField(default = " ", max_length=200)
    Description = models.TextField(default = " ")
    isActive = models.IntegerField(default = 0)

class Question(models.Model):
    Election_Id = models.CharField(default = " ", max_length=200)
    Question_Id = models.IntegerField(default = 0 )
    Question_Wording = models.TextField(default = " " )
    Election_Method = models.CharField(default = " ", max_length=50)

class Alternative(models.Model):
    Vote_Count = models.IntegerField(default = 0)
    Sum_Of_Votes = models.IntegerField(default = 0)
    Alternative_Wording = models.CharField(default = " " , max_length = 500)
    Election_Id = models.CharField(default = " " , max_length = 200)
    Question_Id = models.IntegerField(default = 0 )
    Alternative_Id = models.IntegerField(default =0 )

class Vote(models.Model):
    Vote_Owner = models.CharField(default = " " , max_length = 200)
    Vote_Value = models.IntegerField(default = " " )
    Election_Id = models.CharField(default = " " , max_length = 200)
    Question_Id = models.IntegerField(default = 0)
    Alternative_Id = models.IntegerField(default = 0)
