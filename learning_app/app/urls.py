from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

app_name = 'app'
urlpatterns = [
    path('', views.index, name='index'),
    path('my_page/<int:pk>/', views.show_myPage, name='my_page'),
    path('subject/', views.subject, name='subject'),
    path('test/<int:pk>/', views.selection_test, name='test'),
    path('calculation_list/', views.calculation_list, name='calculation_list'),
    path('user_list/', views.show_userList, name='show_userList'),
    path('score_calTest/', views.score_calTest, name='score_calTest'),
    path('like/<int:pk>/', views.like, name='like'),
    path('make_problem/', views.make_problem, name='make_problem'),
    path('edit_problem/<int:pk>/', views.edit_problem, name='edit_problem'),
    path('get_title/', views.get_title, name='get_title'),
    path('delete_problem/<int:pk>/', views.delete_problem, name='delete_problem'),
    path('my_problem/', views.show_myProblem, name='my_problem'),
    path('test_result/<int:problem_count>/', views.score_selection_test, name='test_result'),
    path('signup/', views.signup, name='signup'),
    path('login/', auth_views.LoginView.as_view(template_name='app/login.html'), name='login'),
    path('guest_login/', views.test_login, name='guest_login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('contact/', views.contact, name='contact'),
    path('thank/', views.thank, name='thank'),
]
