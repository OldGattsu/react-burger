import React from 'react';
import clsx from 'clsx';
import styles from './app.module.css';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Loader from '../loader/loader';

import { sendRequest } from '../../utils/api-helper'
import { IngredientsContext } from '../../contexts/burgerConstructorContext';

export default function App() {
  const [ingredients, setIngreidents] = React.useState([])
  React.useEffect(() => {
    getIngredients()
  }, [])

  const getIngredients = () => {
    sendRequest('ingredients')
      .then((data) => setIngreidents(data.data))
  }

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
              <IngredientsContext.Provider value={{ ingredients }}>
                <BurgerConstructor />
              </IngredientsContext.Provider>
            </>
          )
        }
      </main>
    </div>
  );
}
