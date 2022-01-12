from .views import RegisterAPI, LoginAPI
from django.urls import path
from knox import views as knox_views
from .views import *

urlpatterns = [
    path('api/register', RegisterAPI.as_view(), name='register'),
    path('api/login', LoginAPI.as_view(), name='login'),
    path('api/logout', knox_views.LogoutView.as_view(), name='logout'),
    path('api/logoutall', knox_views.LogoutAllView.as_view(), name='logoutall'),
    path('api/change-password', ChangePasswordView.as_view(),
         name='change-password'),
    path('api/create-store', CreateStoreView.as_view(),name='createstore'),
    path('api/writeblogs', WriteBlog.as_view(),name='writeblogs'),
    path('api/getblogs',GetBlog.as_view(),name='getblogs'),
    path('api/storelist',StoreList.as_view(),name='store-list'),
    path('api/storepage',StorePageView.as_view(),name='storepages'),
    path('api/followstore',FollowStore.as_view(),name='followstore')

]
