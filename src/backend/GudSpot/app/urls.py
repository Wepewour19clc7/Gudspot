from .views import RegisterAPI, LoginAPI
from django.urls import path
from knox import views as knox_views
from .views import *

urlpatterns = [
    path('api/register', RegisterAPI.as_view(), name='register'),
    path('api/login', LoginAPI.as_view(), name='login'),
    path('api/logout', knox_views.LogoutView.as_view(), name='logout'),
    path('api/logoutall', knox_views.LogoutAllView.as_view(), name='logoutall'),
    path('api/change-password', ChangePasswordView.as_view(),name='change-password'),
    path('api/create-store', CreateStoreView.as_view(),name='createstore'),
    path('api/writeblogs', WriteBlog.as_view(),name='writeblogs'),
    path('api/getblogs',GetBlog.as_view(),name='getblogs'),
    path('api/storelist',StoreList.as_view(),name='store-list'),
    path('api/storepage',StorePageView.as_view(),name='storepages'),
    path('api/createcomment',CreateComment.as_view(),name='createcomment'),
    path('api/followstore',FollowStore.as_view(),name='followstore'),
    path('api/user-info',UserInformationView.as_view(),name='userinfo'),
    path('api/user-info/edit',ChangeUserInfo.as_view(),name='userinfo-edit'),
    path('api/review',CreateReviewView.as_view(),name='create-review'),
    path('api/get-review',GetReviewView.as_view(),name='get-review'),
    path('api/get-user-follow', GetUserFollows.as_view(), name='get-user-follow'),
    path('api/get-top-follow-store', GetTopFollowStore.as_view(),name='gettopfollowstore'),
    path('api/storedashboard',StoreDashboard.as_view(),name='store-dashboard'),
    path('api/delete-blog',DeleteBlogView.as_view(),name='delete-blog'),
    path('api/blogs/activate',ActivateBlog.as_view(),name='activate-blog'),  
    path('api/get-all-blogs',GetAllBlogsActivatedView.as_view(),name='get-all-blogs'),
    path('api/get-stores-owner',GetStoreOnwnerView.as_view(),name='get-store-owner'),

]
