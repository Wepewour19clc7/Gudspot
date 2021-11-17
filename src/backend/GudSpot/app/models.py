from django.db import models
from django.db.models.fields.related import ForeignKey
from knox.models import AuthToken
# Create your models here.

class user_type(models.Model):
    class USER_TYPES(models.IntegerChoices):
        ADMIN = 0
        OWNER = 1
        R_USERS = 2
        USERS = 3
    user_id = models.IntegerField(primary_key=True,ForeignKey=auth_user)
    user_type = models.IntegerField(choices=USER_TYPES.choices)
