import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { AuthRoutes } from '../../routes'
const AuthWall = () => {
  const isLogged = false
  return (
    <>
      {AuthRoutes.map(({ path, exact, component }, i) => {
        return (
          <Route key={i} exact={exact} path={path} component={component} />
        );
      })}
    </>
  )
}

export default AuthWall