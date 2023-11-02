from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser

class Users(AbstractBaseUser):
    username = models.CharField(max_length=10, primary_key=True)
    name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    created = models.DateTimeField(default=timezone.now)
    updated = models.DateTimeField(auto_now=True)

    class meta:
        db_table = 'Users'

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ('email','name','password') 