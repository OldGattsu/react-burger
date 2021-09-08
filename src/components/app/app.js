import React from 'react'
import clsx from 'clsx'
import styles from './app.module.css'

import { useSelector, useDispatch } from 'react-redux'
import { getIngredients } from '../../store/actions/ingredients'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import Loader from '../loader/loader'

export default function App() {
  const dispatch = useDispatch()
  const {
    ingredients,
    ingredientsRequest,
    ingredientsSuccess,
    ingredientsFailed,
  } = useSelector(state => {
    return {
      ingredients: state.ingredients.data,
      ingredientsRequest: state.ingredients.ingredientsRequest,
      ingredientsSuccess: state.ingredients.ingredientsSuccess,
      ingredientsFailed: state.ingredients.ingredientsFailed,
    }
  })
  React.useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch])

  return (
    <div>
      <AppHeader />
      <main className={clsx(
        styles.main,
        'pb-10',
      )}>
        {ingredientsRequest && (<Loader noBlackout/>)}
        {ingredientsFailed && (<div>error</div>)}
        {ingredientsSuccess && (
          <>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients ingredients={ingredients} />
              <BurgerConstructor />
            </DndProvider>
          </>
        )}
      </main>
    </div>
  );
}
