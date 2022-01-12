from enum import unique
from typing import Text
from django.db import models
from django.db.models.deletion import CASCADE
from django.db.models.fields import TextField
from django.db.models.fields.json import JSONField
from django.db.models.fields.related import ForeignKey
from knox.models import AuthToken
from django.contrib.auth.models import User

# Create your models here.

class user_information(models.Model):
    class USER_TYPES(models.IntegerChoices):
        ADMIN = 0
        OWNER = 1
        USERS = 2
    description = TextField()
    user_id = models.OneToOneField(User, primary_key=True, on_delete=models.CASCADE)
    user_type = models.IntegerField(choices=USER_TYPES.choices)
    avatar = models.JSONField()
    username = models.CharField(max_length=100)

# Store model
class Store(models.Model):
    owner_id = models.ForeignKey(User, on_delete=CASCADE)
    store_name = models.CharField(max_length=100)
    description = models.TextField()
    store_address = models.CharField(max_length=200)
    create_date = models.DateTimeField(auto_now_add=True)
    img_url = models.JSONField()
    def __str__(self):
        return self.store_name

# Blog model
class Blog(models.Model):
    user_id = models.ForeignKey(User, on_delete=CASCADE)
    store_id = models.ForeignKey(Store, on_delete=CASCADE)
    
    content = models.TextField()
    img_url = models.JSONField()
    posted_date = models.DateTimeField(auto_now_add=True)



# Review model
class Review(models.Model):
    class Meta:
        unique_together = (("store_id", "user_id"),)

    REVIEW_SCORE = [
        (1, "TooBad"),
        (2, "Bad"),
        (3, "Neutral"),
        (4, "Good"),
        (5, "VeryGood"),
    ]
    store_id = models.ForeignKey(Store, on_delete=CASCADE)
    user_id = models.ForeignKey(User, primary_key=True, on_delete=CASCADE)
    score = models.IntegerField(choices=REVIEW_SCORE)


# Comment model
class Comment(models.Model):
    blog_id = models.ForeignKey(Blog, on_delete=CASCADE)
    user_id = models.ForeignKey(User, on_delete=CASCADE)
    content = models.TextField()
    create_date = models.DateTimeField(auto_now_add=True)
    
# Favorite model
class Favorite(models.Model):
    class Meta:
        unique_together = (("store_id", "user_id"),)

    store_id = models.ForeignKey(Store, on_delete=CASCADE)
    user_id = models.ForeignKey(User, primary_key=True, on_delete=CASCADE)
    def __str__(self):
        return self.title

# Follow model
class Follow(models.Model):
    class Meta:
        unique_together = (("store_id", "user_id"),)

    store_id = models.ForeignKey(Store, on_delete=CASCADE)
    user_id = models.ForeignKey(User, on_delete=CASCADE)
