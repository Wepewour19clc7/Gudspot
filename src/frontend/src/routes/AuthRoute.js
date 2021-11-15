import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const AuthRoute = props => {
  const userIsLogged = false

  return (
    <Route {...props}>{userIsLogged ? props.children : <Redirect to={"/"}/>}</Route>
  )
}

export default AuthRoute