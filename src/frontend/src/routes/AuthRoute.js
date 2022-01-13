import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { getToken } from '../auth'

const AuthRoute = props => {
  const isLogged = !!getToken()

  return (
    <Route {...props}>{isLogged ? props.children : <Redirect to={"/"}/>}</Route>
  )
}

export default AuthRoute