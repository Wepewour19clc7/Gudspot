from rest_framework import serializers
from django.contrib.auth.models import User

from app.models import Store,Review,Comment,Blog,Follow,Favorite

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])

        return user


class ChangePasswordSerializer(serializers.Serializer):
    model = User

    """
    Serializer for password change endpoint.
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

#Store Serializer 
class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = ('owner_id','store_name','store_address','img_url')

    def create(self,validated_data):
        return Store.objects.create(**validated_data)

#Review Serializer
class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('id','store_id','user_id','score')

    def create(self,validated_data):
        return Review.objects.create(**validated_data)

        
#Comment Serializer
class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id','content')

    def create(self,validated_data):
        return Review.objects.create(**validated_data)
    
#Blog Serializer
class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = ('user_id', 'store_id','content','img_url')
    def create(self,validated_data):
        return Blog.objects.create(**validated_data)
    
#Favorite Serializer
class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
        fields = ('id','store_id','user_id')

    def create(self,validated_data):
        return Favorite.objects.create(**validated_data)

#Follow Serializer
class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follow
        fields = ('id','store_id','user_id')

    def create(self,validated_data):
        return Follow.objects.create(**validated_data)

