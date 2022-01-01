from rest_framework import serializers
from django.contrib.auth.models import User

from app.models import Store,Review,Comment,Blog,Follow

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
        fields = ('id','owner_id','store_name','store_address','create_date','img_url')

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