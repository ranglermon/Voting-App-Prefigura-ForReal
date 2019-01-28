from django.urls import path
from . import views

urlpatterns = [
	path('api/elections/', views.ElectionListCreate.as_view() ),
	path('api/questions/', views.QuestionListCreate.as_view() ),
	path('api/alternatives/', views.AlternativeListCreate.as_view() ),
	path('api/votes/', views.VoteListCreate.as_view() ),
	path('accounts/signup', views.signup),
	path('accounts/profile', views.profile),
	path('getresult/<int:election_id>', views.get_result)

]

