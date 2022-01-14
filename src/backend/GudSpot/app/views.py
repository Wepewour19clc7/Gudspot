from re import search
from django.db import reset_queries
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
from django.db.models import Count

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
        data = Blog.objects.filter(store_id_id=request.data['store_id'])
        if data != None:
            response = dict()
            response['data'] = data.values()
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
    pagination_class = PageNumberPagination
    search_fields = (
        '^store_name',
        '^store_address',
    )

class StorePageView(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        id = request.GET.get('store_id',None)

        if id != None:
            store_id = id
            store_data = model_to_dict(Store.objects.get(id=store_id))
            owner_data = model_to_dict(user_information.objects.get(user_id=store_data['owner_id']))
            followers = Follow.objects.filter(store_id=store_id).count()
            store_data['follow_counts'] = followers
            return Response({
                "status": "success",
                "code" : status.HTTP_200_OK,
                "store_data": store_data,
                "owner_data": owner_data,
                
            },status=status.HTTP_200_OK)

class UserInformationView(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        id = request.GET.get('user_id')
        if id == None:
            return Response({"status": "Bad request"}, status=status.HTTP_400_BAD_REQUEST)
        data = user_information.objects.get(user_id=id)
        if data != None:
            response = model_to_dict(data)
            response['status'] = 'success'
            response['code'] = status.HTTP_200_OK
            return Response(response,status=status.HTTP_200_OK)
        else:
            return Response({"status": "Bad request"}, status=status.HTTP_400_BAD_REQUEST)

#Comment
class CreateComment(generics.GenericAPIView):
    serializer_class = CommentSerializer
    model = Comment
    permissions_classes = (IsAuthenticated,)
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            obj = serializer.save()
            data = Comment.objects.get(id=obj.id)
            response = model_to_dict(data)
            response['status'] = 'success'
            response['code'] = '201'
            return Response(response,status=status.HTTP_201_CREATED)
        else: 
            return Response({"status": "Bad request"}, status=status.HTTP_400_BAD_REQUEST)
        

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

        message = {"Message": "Store Followed","status":"success","code":201}
        response = Response()
        if data.exists():
            message['Message'] = "Store Unfollowed"
            data.delete()
            response = Response(message, status=status.HTTP_201_CREATED)
        else:
            follow = Follow.objects.create(store_id_id=store_id,user_id_id=user_id)
            follow.save()
            response = Response(message, status=status.HTTP_201_CREATED)
            
        return response            
        
class ChangeUserInfo(generics.GenericAPIView):
    serializer_class = ChangeInfoSerializer
    model = user_information
    permission_classes = (IsAuthenticated,)
    #POST method
    def post(self, request, *args, **kwargs):
        user_id = request.POST['user_id']
        username = request.POST['username']
        avatar = request.POST['avatar']
        description = request.POST['description']
        name = request.POST['name']
        address = request.POST['address']
        data = user_information.objects.filter(
            user_id_id = user_id,
        )
        
        #Check if data exists 
        if data.exists():
            obj = user_information.objects.update(
                username = username,
                avatar = avatar,
                description = description,
                name = name,
                address = address
            )
            obj = user_information.objects.get(user_id_id = user_id)
            response = model_to_dict(obj)
            response['status'] = 'success'
            response['code'] = status.HTTP_200_OK
            return Response(response,status=status.HTTP_200_OK)
        else:
            return Response({"status": "Bad request"}, status=status.HTTP_400_BAD_REQUEST)

class CreateReviewView(generics.GenericAPIView):
    serializer_class = ReviewSerializer
    model = Review
    permission_classes = (IsAuthenticated,)
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            obj = serializer.save()
            response = dict()
            data = Review.objects.get(user_id=obj.user_id,store_id=obj.store_id)
            response['data'] = model_to_dict(data)
            response['status'] = 'success'
            response['code'] = '200'
            return Response(response,status=status.HTTP_200_OK)
        else: 
            return Response({"status": "Bad request"}, status=status.HTTP_400_BAD_REQUEST)

class GetReviewView(generics.GenericAPIView):
    serializer_class = GetReviewSerializer
    model = Review
    def get(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            data = Review.objects.filter(store_id=serializer.data['store_id'])
            t = data.values_list('score', flat = True)
            avg_follows = sum(t)/len(t)
            response = dict()
            response['data'] = data.values()
            response['status'] = 'success'
            response['code'] = status.HTTP_200_OK
            response['avg_scores'] = avg_follows
            return Response(response,status=status.HTTP_200_OK)
        else:
            return Response({"status": "Bad request"}, status=status.HTTP_400_BAD_REQUEST)

class GetUserFollows(generics.GenericAPIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, *args, **kwargs):
        data = Review.objects.filter(user_id=request.data['user_id'])
        if data != None:
            response = dict()
            response['data'] = data.values()

class GetTopFollowStore(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        store = Store.objects.all().values_list('id', flat = True)
        followers = []
        # Get each store followers
        for id in store:
            store_follow = []
            store_follow.append(id)
            store_follow.append(Follow.objects.filter(store_id=id).count())
            followers.append(store_follow)
        # Bubble sort because i'm stupid
        for j in range(len(followers)-1):
            for x in range(j,len(followers)):
                if followers[j][1] < followers[x][1]:
                    tmp = followers[j]
                    followers[j] = followers[x]
                    followers[x] = tmp
        # Get store data
        store_datas = []
        for obj in followers:
            st_fl = []
            store_data = Store.objects.get(id=obj[0])
            st_fl.append(model_to_dict(store_data))
            st_fl.append(obj[1])
            store_datas.append(st_fl)
        if store_datas != None:
            response = dict()
            if len(store_datas) < 10:
                response['data'] = store_datas
            else:
                response['data'] = store_datas[:10]
            response['status'] = 'success'
            response['code'] = status.HTTP_200_OK
            return Response(response,status=status.HTTP_200_OK)
        else:
            return Response({"status": "Bad request"}, status=status.HTTP_400_BAD_REQUEST)
        
class StoreDashboard(generics.ListCreateAPIView):
    queryset = Store.objects.all().order_by('-create_date')
    serializer_class = StoreSerializer
    name = 'store-dashboard'
    pagination_class = PageNumberPagination
    
class ActivateBlog(generics.GenericAPIView):
    serializer_class = BlogSerializer
    model = Blog
    #POST method
    def post(self, request, *args, **kwargs):
        blog_id = request.POST['blog_id']
        data = Blog.objects.filter(id = blog_id)
        
        #Check if data exists 
        if data.exists():
            obj = data.update(activated = True)
            obj = Blog.objects.get(id = blog_id)
            response = model_to_dict(obj)

class GetAllBlogsActivatedView(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        data = Blog.objects.filter(activated=True)
        if data != None:
            response = dict()
            response['data'] = data.values()
            response['status'] = 'success'
            response['code'] = status.HTTP_200_OK
            return Response(response,status=status.HTTP_200_OK)
        else:
            return Response({"status": "Bad request"}, status=status.HTTP_400_BAD_REQUEST)