from enum import unique
from django.db import models
from django.db.models.deletion import CASCADE
from django.db.models.fields import TextField
from django.db.models.fields.related import ForeignKey
from knox.models import AuthToken
from django.contrib.auth.models import User

# Create your models here.


class user_type(models.Model):
    class USER_TYPES(models.IntegerChoices):
        ADMIN = 0
        OWNER = 1
        R_USERS = 2
        USERS = 3

    user_id = models.OneToOneField(User, primary_key=True, on_delete=models.CASCADE)
    user_type = models.IntegerField(choices=USER_TYPES.choices)


# Store model
class Store(models.Model):
    owner_id = models.ForeignKey(User, on_delete=CASCADE)
    store_name = models.CharField(max_length=100)
    store_address = models.CharField(max_length=200)
    create_date = models.DateTimeField(auto_now_add=True)
    img_url = models.URLField()


# Blog model
class Blog(models.Model):
    content = models.TextField()
    img_url = models.URLField()
    posted_date = models.DateTimeField()


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
    class Meta:
        unique_together = (("blog_id", "user_id"),)

    blog_id = models.ForeignKey(Blog, on_delete=CASCADE)
    user_id = models.ForeignKey(User, primary_key=True, on_delete=CASCADE)
    content = models.TextField()


# Favorite model
class Favorite(models.Model):
    class Meta:
        unique_together = (("store_id", "user_id"),)

    store_id = models.ForeignKey(Store, on_delete=CASCADE)
    user_id = models.ForeignKey(User, primary_key=True, on_delete=CASCADE)


# Follow model
class Follow(models.Model):
    class Meta:
        unique_together = (("store_id", "user_id"),)

    store_id = models.ForeignKey(Store, on_delete=CASCADE)
    user_id = models.ForeignKey(User, primary_key=True, on_delete=CASCADE)
