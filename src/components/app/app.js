import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

const ingredientsAPi = 'https://norma.nomoreparties.space/api/ingredients ';

export default function App() {
  const [ingredients, setIngreidents] = React.useState([])

  React.useEffect(() => {
    getIngredients()
  }, [])

  const getIngredients = async () => {
    const res = await fetch(ingredientsAPi);
    const data = await res.json();
    setIngreidents(data.data)
  }

  return (
    <div>
      <AppHeader />
      <main className={styles.main}>
        {ingredients.length !==0 &&
          (
          <>
            <BurgerIngredients ingredients={ingredients} />
            <BurgerConstructor ingredients={ingredients} />
          </>
        )}
      </main>
    </div>
  );
}
