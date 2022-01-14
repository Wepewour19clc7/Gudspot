import React from 'react'
import Main from '../pages/Home'
import Profile from '../pages/Profile'
import StoreOwner from '../pages/StoreOwner'
import AboutUs from '../pages/AboutUs'
import LogIn from '../pages/LogIn'
import Register from '../pages/Register'
import UserManager from '../pages/BlogManager'
import Terms from '../pages/Terms'
import BlogPage from '../pages/BlogPage'

const ViewRoutes = [
  {
    path: '/',
    exact: true,
    component: () => <Main />,
  },
  {
    path: '/store/:id',
    exact: true,
    component: () => <StoreOwner />,
  },
  {
    path: '/store/:id/blog/:blog_id',
    exact: true,
    component: () => <BlogPage />,
  },
  {
    path: '/about-us',
    exact: true,
    component: () => <AboutUs />,
  },
  {
    path: '/login',
    exact: true,
    component: () => <LogIn />,
  },
  {
    path: '/register',
    exact: true,
    component: () => <Register />,
  },
  {
    path:'/terms_of_user',
    exact: true,
    component: () => <Terms />,
  },
  {
    path: '/manage_blog',
    exact: true,
    component: () => <UserManager />,
  },
]

const AuthRoutes = [
  {
    path: '/profile',
    exact: true,
    component: () => <Profile />,
  },
  {
    path: '/create-post',
    exact: true,
    component: () => <Profile />,
  },
]
export { ViewRoutes, AuthRoutes }
