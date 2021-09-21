import { useEffect, useMemo } from 'react'
import clsx from 'clsx'
import styles from './app.module.css'

import { useDispatch, useSelector } from 'react-redux'
import { getIngredients } from './store/actions/ingredients'
import { getUser } from './store/actions/user'
import { unsetShownIngredient } from './store/actions/ingredient'

import { Switch, Route, useLocation, useHistory } from 'react-router-dom'

import {
  AppHeader,
  ProtectedRoute,
  Modal,
  IngredientDetails,
} from './components'
import {
  Home,
  Login,
  Registration,
  ForgotPassword,
  ResetPassword,
  Profile,
  Ingredient,
} from './pages'

export default function Main() {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const background = location.state && location.state.background

  useEffect(() => {
    history.replace({
      state: { background: undefined },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const closeIngredientModal = () => {
    dispatch(unsetShownIngredient())
    history.goBack()
  }

  const shownIngredient = useSelector((state) => state.ingredient.data)
  const isIngredientModalShow = useMemo(() => {
    return Object.keys(shownIngredient).length > 0
  }, [shownIngredient])

  useEffect(() => {
    dispatch(getIngredients())
    dispatch(getUser())
  }, [dispatch])

  return (
    <>
      <AppHeader />
      <main className={clsx(styles.main, 'pb-10')}>
        <Switch location={background || location}>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path='/login' exact>
            <Login />
          </Route>
          <Route path='/registration' exact>
            <Registration />
          </Route>
          <Route path='/forgot-password' exact>
            <ForgotPassword />
          </Route>
          <Route path='/reset-password' exact>
            <ResetPassword />
          </Route>
          <ProtectedRoute path='/profile'>
            <Profile />
          </ProtectedRoute>
          <Route path='/ingredients/:id' exact>
            <Ingredient />
          </Route>
        </Switch>
        {background && isIngredientModalShow && (
          <Route path='/ingredients/:id'>
            <Modal title='Детали ингредиента' onClose={closeIngredientModal}>
              <IngredientDetails
                name={shownIngredient.name}
                imageLarge={shownIngredient.image_large}
                calories={shownIngredient.calories}
                proteins={shownIngredient.proteins}
                fat={shownIngredient.fat}
                carbohydrates={shownIngredient.carbohydrates}
              />
            </Modal>
          </Route>
        )}
      </main>
    </>
  )
}
