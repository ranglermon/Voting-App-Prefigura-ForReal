from django.urls import path, include
from . import views
from rest_framework_simplejwt import views as jwt_views


urlpatterns = [
    path('api/election/', views.ElectionListCreate.as_view() ),
    path('api/questions/', views.QuestionListCreate.as_view() ),
    path('api/alternatives/', views.AlternativeListCreate.as_view() ),
    path('api/votes/', views.VoteListCreate.as_view() ),
    path('accounts/signup', views.signup),
    path('accounts/profile', views.profile),
    path('getresult/<str:election_id>', views.get_result),
    path('api/auth/register', views.RegistrationAPI.as_view()),
    path('api/auth/login', views.LoginAPI.as_view()),
    path('api-auth/', include('rest_framework.urls')),
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    ]
