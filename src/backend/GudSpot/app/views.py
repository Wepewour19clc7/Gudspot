from rest_framework import generics, permissions, serializers, status
from rest_framework import response
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.decorators import api_view
from rest_framework.filters import SearchFilter,OrderingFilter
from rest_framework.pagination import PageNumberPagination
from knox.models import AuthToken
from knox.views import LoginView as KnoxLoginView
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth import login
from django.contrib.auth.models import User
from django.shortcuts import render
from .serializers import *
from .models import *


class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        AuthToken.objects.create(user)
        user_information(user_type=request.data['type'],user_id=user).save()
        return Response({
            "status": 'success',
            'code': status.HTTP_200_OK,
            'message': 'Account created',
        })


class LoginAPI(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        response = super(LoginAPI, self).post(request, format=None)
        response.data['id'] = str(user.id)
        response.data['name'] = str(user.username)
        #############
        # QUERY HERE#
        #############
        response.data['type'] = str(user_information.objects.get(user_id=user.id).user_type)
        return response

class ChangePasswordView(generics.UpdateAPIView):
    """
    An endpoint for changing password.
    """
    serializer_class = ChangePasswordSerializer
    model = User
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': []
            }

            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class WriteBlog(generics.GenericAPIView):
    serializer_class = BlogSerializer
    model = Blog
    permission_classes = (IsAuthenticated,)
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response({"status": ["OK"]}, status=status.HTTP_200_OK)
        else: 
            return Response({"status": ["Bad request"]}, status=status.HTTP_400_BAD_REQUEST)

class CreateStoreView(generics.GenericAPIView):
    serializer_class = StoreSerializer
    model = Store
    permissions_classes = (IsAuthenticated,)
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response({"status": ["OK"]}, status=status.HTTP_200_OK)
        else: 
            return Response({"status": ["Bad request"]}, status=status.HTTP_400_BAD_REQUEST)

class GetBlog(generics.GenericAPIView):
    serializer_class = BlogSerializer
    model = Blog


#Search Store API
class StoreView(generics.ListAPIView):
    queryset = Store.objects.all()
    serializers_class = StoreSerializer
    filter_backends = (DjangoFilterBackend,SearchFilter)