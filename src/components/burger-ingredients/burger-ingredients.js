import React from 'react';
import styles from './burger-ingredients.module.css';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

export default function BurgerIngredients() {
  const [currentTab, setCurrentTab] = React.useState('buns')
  return (
    <section className={styles.burgerIngredients}>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <div style={{ display: 'flex' }}>
        <Tab value="buns" active={currentTab === 'buns'} onClick={setCurrentTab}>
          Булки
        </Tab>
        <Tab value="sauces" active={currentTab === 'sauces'} onClick={setCurrentTab}>
          Соусы
        </Tab>
        <Tab value="toppings" active={currentTab === 'toppings'} onClick={setCurrentTab}>
          Начинки
        </Tab>
      </div>
    </section>
  )
}