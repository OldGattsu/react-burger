import clsx from 'clsx'
import styles from './app.module.css'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import AppHeader from '../app-header/app-header'
import Home from '../../pages/home'
import Login from '../../pages/login'

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
              <Home />
            </Route>
            <Route path="/login" exact>
              <Login />
            </Route>
          </Switch>
        </main>
      </Router>
    </>
  )
}