import { useEffect } from 'react'
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
    ingredientsPending,
    ingredientsFulfilled,
    ingredientsRejected,
  } = useSelector(state => {
    return {
      ingredients: state.ingredients.data,
      ingredientsPending: state.ingredients.ingredientsPending,
      ingredientsFulfilled: state.ingredients.ingredientsFulfilled,
      ingredientsRejected: state.ingredients.ingredientsRejected,
    }
  })
  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch])

  return (
    <div>
      <AppHeader/>
      <main className={clsx(
        styles.main,
        'pb-10',
      )}>
        {ingredientsPending && (<Loader noBlackout/>)}
        {ingredientsRejected && (<div>error</div>)}
        {ingredientsFulfilled && (
          <>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients/>
              <BurgerConstructor/>
            </DndProvider>
          </>
        )}
      </main>
    </div>
  );
}
