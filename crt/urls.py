# from django.urls import path

# from . import views

# urlpatterns = [
#     path('', views.get_svg, name='index'),
# ]

from django.contrib import admin
from django.urls import path, include                 
from rest_framework import routers                    
from crt import views                            

router = routers.DefaultRouter()                     
router.register(r'crt', views.crtView, 'Chart')     

urlpatterns = [
    
    path('api/', include(router.urls))
              
]