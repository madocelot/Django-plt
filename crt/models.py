#import datetime

from django.db import models

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

class Worker(models.Model):
    name = models.CharField(max_length=200, unique=True)
    def __str__(self):
        return self.name
    

class Sale(models.Model):
    worker = models.ForeignKey(Worker, to_field= 'name', on_delete=models.CASCADE)
    year = models.IntegerField()
    revenue = models.IntegerField()
    def __str__(self):
        return '{}, {}, {}'.format(self.year, self.worker, self.revenue)


            