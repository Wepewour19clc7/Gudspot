from audioop import avg
from re import U, search
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
from django.db.models import Count,Q 
from django.core.paginator import Paginator
from django.http import JsonResponse
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
            name=request.data['username'],
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
        store_id = request.GET.get('store_id',None)
        if store_id == None:
            return Response({"status": "Bad request"}, status=status.HTTP_400_BAD_REQUEST)
        store_obj = Store.objects.filter(id=store_id)
        if len(store_obj) == 0:
            return Response({"status": "Bad request"}, status=status.HTTP_400_BAD_REQUEST)
        data = Blog.objects.filter(store_id_id=store_id)
        if data != None:
            response = dict()
            response['data'] = data.values()
            response['status'] = 'success'
            response['code'] = status.HTTP_200_OK
            return Response(response,status=status.HTTP_200_OK)
        else:
            return Response({"status": "Bad request"}, status=status.HTTP_400_BAD_REQUEST)


#Search store 
class SearchStore(generics.ListCreateAPIView):
    def get(self, request, *args, **kwargs):
        keyword = request.GET['keyword']
        store_queryset = Store.objects.filter(
            Q(store_name__icontains = keyword)| Q(store_address__icontains = keyword)
            )

        if store_queryset !=None:    
            store_data = []
            response = dict()
            for store in store_queryset:
                store_dict = model_to_dict(store)
                review_count = Review.objects.filter(store_id_id = store).count()
                store_dict['review_count'] = review_count
                store_data.append(store_dict)
            
            response['results'] = store_data         
            response['status'] = 'success'
            response['code'] = status.HTTP_200_OK
            
            return Response(response,status=status.HTTP_200_OK)
        else:
            return Response({"status": "Bad request"}, status=status.HTTP_400_BAD_REQUEST)        


class StorePageView(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        id = request.GET.get('store_id',None)

        if id != None:
            store_id = id
            store_data = model_to_dict(Store.objects.get(id=store_id))
            owner_data = model_to_dict(user_information.objects.get(user_id=store_data['owner_id']))
            followers = Follow.objects.filter(store_id=store_id).count()
            store_data['follow_counts'] = followers
            reviews = Review.objects.filter(store_id=store_id)
            review_ar = reviews.values_list('score', flat = True)
            review_counts = reviews.count()
            if review_counts == 0 :
                avg_review = 0
            else: 
                avg_review = sum(review_ar)/review_counts
            review_counts = reviews.count()
            store_data['avg_scores'] = avg_review
            store_data['total_review'] = review_counts
            return Response({
                "status": "success",
                "code" : status.HTTP_200_OK,
                "store_data": store_data,
                "owner_data": owner_data,
                
            },status=status.HTTP_200_OK)

class UserInformationView(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        id = request.GET.get('user_id',None)
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
        store_id = request.data['store_id']
        user_id = request.data['user_id']
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
        
class ChangeUserInfo(generics.UpdateAPIView):
    serializer_class = ChangeInfoSerializer
    model = user_information
    permission_classes = (IsAuthenticated,)
    #POST method
    def update(self, request, *args, **kwargs):
        user_id = request.data['user_id']
        avatar = request.data['avatar']
        description = request.data['description']
        name = request.data['name']
        address = request.data['address']
        data = user_information.objects.filter(
            user_id_id = user_id,
        )
        
        #Check if data exists 
        if data.exists():
            obj = data.update(
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
    def get(self, request, *args, **kwargs):
        store_id = request.GET.get('store_id',None)
        if store_id == None:
            return Response({"status": "Bad request"}, status=status.HTTP_400_BAD_REQUEST)
        store_obj = Store.objects.filter(id=store_id)
        if len(store_obj) == 0:
            return Response({"status": "Bad request"}, status=status.HTTP_400_BAD_REQUEST)
        data = Review.objects.filter(store_id=store_id)
        t = data.values_list('score', flat = True)
        review_datas = []
        for d in data:
            review_data = model_to_dict(d)
            user_data = model_to_dict(user_information.objects.get(user_id=review_data['user_id']))
            review_data['user_info'] = user_data
            review_datas.append(review_data)


        if len(t) == 0:
            avg_review = 0
        else:
            avg_review = sum(t)/len(t)
        response = dict()
        response['data'] = review_datas
        response['status'] = 'success'
        response['code'] = status.HTTP_200_OK
        response['avg_scores'] = avg_review
        response['total'] = len(t)
        return Response(response,status=status.HTTP_200_OK)

class GetUserFollowsList(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        user_id = request.GET.get('user_id',None)
        if user_id == None:
            return Response({"status": "Bad request"}, status=status.HTTP_400_BAD_REQUEST)
        user_obj = user_information.objects.filter(user_id=user_id)
        if len(user_obj) == 0:
            return Response({"status": "Bad request"}, status=status.HTTP_400_BAD_REQUEST)
        data = Follow.objects.filter(user_id=user_id)
        detailed_follow = [] 
        for follow in data:
            store_id = follow.store_id_id
            store = Store.objects.get(id = store_id)
            reviews = Review.objects.filter(store_id=store_id)
            review_ar = reviews.values_list('score', flat = True)
            review_counts = reviews.count()
            if review_counts == 0 :
                avg_review = 0
            else: 
                avg_review = sum(review_ar)/review_counts
            review_counts = reviews.count()
            detailed_store = model_to_dict(store)
            detailed_store['review_count'] = review_counts
            detailed_store['avg_review'] = avg_review
            detailed_follow.append(detailed_store)
            
        response = dict()
        if data != None:
            response['data'] = detailed_follow
        else:
            response['data'] = []
        return Response(response,status=status.HTTP_200_OK)

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

        followers = sorted(followers,key=lambda x:x[1],reverse=True)

        # Get store data
        store_datas = []
        for obj in followers:
            st_fl = []
            store_data = Store.objects.get(id=obj[0])
            t = model_to_dict(store_data)
            reviews = Review.objects.filter(store_id=store_data.id)
            review_ar = reviews.values_list('score', flat = True)
            review_counts = reviews.count()
            if review_counts == 0 :
                avg_review = 0
            else: 
                avg_review = sum(review_ar)/review_counts
            review_counts = reviews.count()
            t['total_review'] = review_counts
            t['total_followers'] = obj[1]
            t['avg_scores'] = avg_review
            st_fl.append(t)
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
    def get(self, request, *args, **kwargs):
        #Config
        # serializer_class = StoreSerializer
        # name = 'store-dashboard'
        # pagination_class = PageNumberPagination
        #Get query set for stores
        store_queryset = Store.objects.all().order_by('-create_date')
        if store_queryset !=None:
            
            store_data = []
            response = dict()
            for store in store_queryset:
                store_dict = model_to_dict(store)
                # review_count = Review.objects.filter(store_id_id = store).count()
                reviews = Review.objects.filter(store_id_id=store)
                review_ar = reviews.values_list('score', flat = True)
                review_counts = reviews.count()
                if review_counts == 0 :
                    avg_review = 0
                else: 
                    avg_review = sum(review_ar)/review_counts
                review_counts = reviews.count()
                store_dict['review_count'] = review_counts
                store_dict['avg_review'] = avg_review
                store_data.append(store_dict)
            
            response['results'] = store_data         
            response['status'] = 'success'
            response['code'] = status.HTTP_200_OK
            
            return Response(response,status=status.HTTP_200_OK)
        else:
            return Response({"status": "Bad request"}, status=status.HTTP_400_BAD_REQUEST)
        
    
class DeleteBlogView(generics.GenericAPIView):
    model = Blog
    permission_classes = (IsAuthenticated,)
    def post(self, request, *args, **kwargs):
        data= Blog.objects.filter(id=request.data['blog_id'])
        if data != None:
            data.delete()
            response = dict()

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
            response['status'] = 'success'
            response['code'] = status.HTTP_200_OK
            return Response(response,status=status.HTTP_200_OK)
        else:
            return Response({"status": "Bad request"}, status=status.HTTP_400_BAD_REQUEST)

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

class GetStoreOnwnerView(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        id = request.GET.get('owner_id',None)
        if id == None:
            return Response({"status": "Bad request"}, status=status.HTTP_400_BAD_REQUEST)
        data = Store.objects.filter(owner_id=id)
        if data != None:
            response = dict()
            response['data'] = data.values()
            response['status'] = 'success'
            response['code'] = status.HTTP_200_OK
            return Response(response,status=status.HTTP_200_OK)
        else:
            return Response({"status": "Bad request"}, status=status.HTTP_400_BAD_REQUEST)

class ReviewedOrNotView(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        store_id = request.GET.get('store_id',None)
        user_id = request.GET.get('user_id',None)
        if user_id == None or store_id == None:
            return Response({"status": "Bad request"}, status=status.HTTP_400_BAD_REQUEST)
        data = Review.objects.filter(store_id=store_id, user_id=user_id)
        response = dict()
        if len(data) != 0:
            response['mesg'] = 'Already reviewed'
            return Response(response,status=status.HTTP_200_OK)
        else:
            response['mesg'] = 'Did not review'
            return Response(response,status=status.HTTP_200_OK)

class FollowedOrNotView(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        store_id = request.GET.get('store_id')
        user_id = request.GET.get('user_id')
        data = Follow.objects.filter(store_id=store_id, user_id=user_id)
        response = dict()
        if data.exists():
            response['mesg'] = 'Already Followed'
            return Response(response,status=status.HTTP_200_OK)
        else:
            response['mesg'] = 'Did not Follow'
            return Response(response,status=status.HTTP_200_OK)