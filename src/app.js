import { useEffect } from 'react'
import clsx from 'clsx'
import styles from './app.module.css'

import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom'

import {
  AppHeader,
  ProtectedRoute,
 } from './components'
import {
  Home,
  Login,
  Registration,
  ForgotPassword,
  ResetPassword,
  Profile,
} from './pages'

export default function Main() {
  // const location = useLocation()
  const location = '/'

  return (
    <>
      <Router>
        <AppHeader/>
        <main className={clsx(
          styles.main,
          'pb-10',
        )}>
          <Switch>
            <Route path="/" exact>
              <Home/>
            </Route>
            <Route path="/login" exact>
              <Login/>
            </Route>
            <Route path="/registration" exact>
              <Registration/>
            </Route>
            <Route path="/forgot-password" exact>
              <ForgotPassword/>
            </Route>
            <Route path="/reset-password" exact>
              <ResetPassword/>
            </Route>
            <ProtectedRoute path="/profile" location={location}>
              <Profile/>
            </ProtectedRoute>
          </Switch>
        </main>
      </Router>
    </>
  )
}