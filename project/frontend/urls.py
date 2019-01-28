from django.urls import path
from . import views

urlpatterns = [
    path('election/<int:election>/', views.index_election ),
]