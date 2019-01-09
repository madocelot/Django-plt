import datetime

from django.db import models
from django.utils import timezone

# Create your models here.

class City(models.Model):
    c_name = models.CharField(max_length=200)
    def __str__(self):
            return self.c_name
    

class Popul(models.Model):
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    Year = models.IntegerField()
    Population = models.IntegerField()
    def __str__(self):
            return 'Year: {}, population: {}'.format(self.Year, self.Population)