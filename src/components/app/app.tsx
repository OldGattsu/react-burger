import { useEffect, useMemo } from 'react'
import clsx from 'clsx'
import styles from './app.module.css'

import { useDispatch, useSelector } from '../../store/hooks'
import { getIngredients } from '../../store/actions/ingredients'
import { getUser } from '../../store/actions/user'
import { unsetShownIngredient } from '../../store/actions/ingredient'
import { closeOrderModal } from '../../store/actions/order'

import { Switch, Route, useLocation, useHistory } from 'react-router-dom'

import { AppHeader, ProtectedRoute, Modal, IngredientDetails, Order } from '..'
import {
  Home,
  Login,
  Registration,
  ForgotPassword,
  ResetPassword,
  Profile,
  Ingredient,
  FeedPage,
} from '../../pages'
import { IIngredient } from '../../types/ingredient'

export default function Main() {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation<{ background: undefined }>()
  const background = location?.state?.background

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

  const shownIngredient = useSelector((state) => state.ingredient.data) as IIngredient
  const isIngredientModalShow = useMemo(() => {
    return Object.keys(shownIngredient).length > 0
  }, [shownIngredient])

  const isOrderModalShow = useSelector((state) => state.order.orderModal)
  const unsetOrderModal = () => {
    dispatch(closeOrderModal())
    history.goBack()
  }

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
          <Route path='/feed' exact>
            <FeedPage />
          </Route>
          <Route path='/feed/:id'>
            <Order />
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
        {background && isOrderModalShow && (
          <Route path='/feed/:id'>
            <Modal onClose={unsetOrderModal}>
              <Order />
            </Modal>
          </Route>
        )}
        {background && isOrderModalShow && (
          <Route path='/profile/orders/:id'>
            <Modal onClose={unsetOrderModal}>
              <Order />
            </Modal>
          </Route>
        )}
      </main>
    </>
  )
}
