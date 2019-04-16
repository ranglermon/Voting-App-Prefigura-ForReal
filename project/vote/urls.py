from django.urls import path, include
from . import views

urlpatterns = [
    path('api/election/', views.ElectionListCreate.as_view() ),
    path('api/questions/', views.QuestionListCreate.as_view() ),
    path('api/alternatives/', views.AlternativeListCreate.as_view() ),
    path('api/votes/', views.VoteListCreate.as_view() ),
    path('accounts/signup', views.signup),
    path('accounts/profile', views.profile),
    path('getresult/<str:election_id>', views.get_result),
    path('api/auth/', include('knox.urls')),
    path('api/auth/register', views.RegistrationAPI.as_view()),
    path('api/auth/login', views.LoginAPI.as_view()),
    path('api-auth/', include('rest_framework.urls')),
    ]
