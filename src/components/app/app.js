import React from 'react';
import clsx from 'clsx';
import styles from './app.module.css';

import { useSelector, useDispatch } from 'react-redux'
import { getIngredients } from '../../store/actions/ingredients'

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Loader from '../loader/loader';

import { sendRequest, INGREDIENTS } from '../../utils/api-helper'
import { IngredientsContext } from '../../contexts/burgerConstructorContext';

export default function App() {
  // const [ingredients, setIngreidents] = React.useState([])
  const dispatch = useDispatch()
  const ingredients = useSelector(state => state.ingredients.ingredients)
  React.useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch])

  // const getIngredients = () => {
  //   sendRequest(INGREDIENTS)
  //     .then((data) => setIngreidents(data.data))
  // }

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
              <BurgerIngredients ingredients={ingredients} />
              <IngredientsContext.Provider value={ingredients}>
                <BurgerConstructor />
              </IngredientsContext.Provider>
            </>
          )
        }
      </main>
    </div>
  );
}
