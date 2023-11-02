from django.urls import path
from .views import createUserAPIView,AuthenticateUserAPIView

urlpatterns = [
    path('register',createUserAPIView.as_view(),name="register"),
    path('login', AuthenticateUserAPIView.as_view(),name="login")
]