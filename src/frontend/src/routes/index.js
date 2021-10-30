import React from 'react'
import Main from '../pages/Home'
import Profile from '../pages/Profile'
import StoreOwner from '../pages/StoreOwner'

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
