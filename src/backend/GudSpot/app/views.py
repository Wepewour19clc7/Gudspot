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
from django.forms.models import model_to_dict
from django.core import serializers
from rest_framework.renderers import JSONRenderer

class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        AuthToken.objects.create(user)
        user_information(
            user_type=request.data['type'],
            user_id=user,
            avatar=request.data['avatar'],
            username=request.data['username'],
            description=request.data['description']).save()
        return Response({
            "status": 'success',
            'code': status.HTTP_201_CREATED,
            'message': 'Account created',
        },status=status.HTTP_201_CREATED)


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

            return Response(response,status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class WriteBlog(generics.GenericAPIView):
    serializer_class = BlogSerializer
    model = Blog
    permission_classes = (IsAuthenticated,)
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            obj = serializer.save()
            data = Blog.objects.get(id=obj.id)
            response = model_to_dict(data)
            response['status'] = 'success'
            return Response(response,status=status.HTTP_201_CREATED)
        else: 
            return Response({"status": "Bad request"}, status=status.HTTP_400_BAD_REQUEST)

class CreateStoreView(generics.GenericAPIView):
    serializer_class = StoreSerializer
    model = Store
    permissions_classes = (IsAuthenticated,)
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            obj = serializer.save()
            data = Store.objects.get(id=obj.id)
            return Response(model_to_dict(data),status=status.HTTP_200_OK)
        else: 
            return Response({"status": "Bad request"}, status=status.HTTP_400_BAD_REQUEST)

class GetBlog(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        data = Blog.objects.all().filter(store_id=request.data['store_id'])
        if data != None:
            response = dict()
            count = 0
            for blog in data:
                response[str(count)] = model_to_dict(blog)
            response['status'] = 'success'
            response['code'] = status.HTTP_200_OK
            return Response(response,status=status.HTTP_200_OK)
        else:
            return Response({"status": "Bad request"}, status=status.HTTP_400_BAD_REQUEST)


#Search store 
class StoreList(generics.ListCreateAPIView):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer
    name = 'store-list'
    
    search_fields = (
        '^store_name',
        '^store_address',
    )

class StorePageView(generics.GenericAPIView):
    serializer_class = StorePageSerializer
    def get(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            store_id = request.data['store_id']
            store_data = model_to_dict(Store.objects.get(id=store_id))
            owner_data = model_to_dict(user_information.objects.get(user_id=store_data['owner_id']))
            return Response({
                "status": "success",
                "code" : status.HTTP_200_OK,
                "store_data": store_data,
                "owner_data": owner_data
            },status=status.HTTP_200_OK)

class UserInformationView(generics.GenericAPIView):
    serializer_class = UserInformationSerializer
    def get(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            data = user_information.objects.get(user_id=request.data['user_id'])
            response = model_to_dict(data)
            response['status'] = 'success'
            response['code'] = status.HTTP_200_OK
            return Response(model_to_dict(data),status=status.HTTP_200_OK)
        else:
            return Response({"status": ["Bad request"]}, status=status.HTTP_400_BAD_REQUEST)
        

class FollowStore(generics.GenericAPIView):
    serializer_class = FollowSerializer
    model = Follow
    permission_classes = (IsAuthenticated,)
    def post(self, request, *args, **kwargs):
        # serializer = self.get_serializer(data=request.data)
        # if serializer.is_valid():
        # print(serializer.is_valid())
        # obj = serializer.save()
        store_id = request.POST['store_id']
        user_id = request.POST['user_id']
        data = Follow.objects.filter(store_id_id=store_id,user_id_id=user_id)

        message = {"Success": "Store Followed","status":"201"}
        response = Response()
        if data.exists():
            message = {"Success": "Store Unfollowed","status":"201"}
            data.delete()
            response = Response(message, status=status.HTTP_201_CREATED)
        else:
            follow = Follow.objects.create(store_id_id=store_id,user_id_id=user_id)
            follow.save()
            response = Response(message, status=status.HTTP_201_CREATED)
            
        return response            
        
