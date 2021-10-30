import LayoutApp from './components/Layout'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AuthRoute from './routes/AuthRoute'
import { AuthRoutes, ViewRoutes } from './routes'

export default function App () {
  return (
    <Router>
      <LayoutApp>
        <Switch>
          {ViewRoutes.map(({ path, exact, component }, key) => {
            return (
              <Route key={key} exact={exact} path={path}>
                {component}
              </Route>
            )
          })}
          {AuthRoutes.map(({ path, exact, component }, key) => {
            return (
              <AuthRoute key={key} exact={exact} path={path}>
                {component}
              </AuthRoute>
            )
          })}
        </Switch>
      </LayoutApp>
    </Router>
  )
}