import React from 'react'
import Main from '../pages/Home'
import Profile from '../pages/Profile'
import StoreOwner from '../pages/StoreOwner'
import AboutUs from '../pages/AboutUs'

const ViewRoutes = [
  {
    path: '/',
    exact: true,
    component: () => <Main />,
  },
  {
    path: '/store',
    exact: true,
    component: () => <StoreOwner />,
  },
  {
    path: '/about-us',
    exact: true,
    component: () => <AboutUs />,
  }
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
