import clsx from 'clsx'
import styles from './app.module.css'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import AppHeader from './components/app-header/app-header'
import {
  Home,
  Login,
  Registration,
  ForgotPassword,
  ResetPassword,
  Profile,
} from './pages'

export default function Main() {

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
            <Route path="/profile" exact>
              <Profile/>
            </Route>
          </Switch>
        </main>
      </Router>
    </>
  )
}