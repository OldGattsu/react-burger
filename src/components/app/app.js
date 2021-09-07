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
  const ingredients = useSelector(state => state.ingredients.data)
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
        {ingredients.length ===0
          ? (<Loader noBlackout />)
          : (
            <>
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredients ingredients={ingredients} />
                <BurgerConstructor />
              </DndProvider>
            </>
          )
        }
      </main>
    </div>
  );
}
