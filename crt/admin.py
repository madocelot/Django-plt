from django.contrib import admin

# Register your models here.

from django.contrib import admin
from .models import Worker, Sale 

class crtAdmin(admin.ModelAdmin):  
    list_display = ('worker', 'year', 'revenue') 

# Register your models here.
admin.site.register(Sale, crtAdmin)