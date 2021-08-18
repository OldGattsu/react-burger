import React from 'react';
import styles from './burger-constructor.module.css';

import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'

export default function BurgerConstructor({ingredients}) {
  return (
    <section className={styles.burgerConstructor}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text={ingredients[0].name + " (верх)"}
        price={ingredients[0].price}
        thumbnail={ingredients[0].image}
      />

      <div className={styles.burgerConstructorScroll}>
        {ingredients.map((ingredient) => {
          return (
            <ConstructorElement
              key={ingredient._id}
              text={ingredient.name}
              price={ingredient.price}
              thumbnail={ingredient.image_large}
            />
          )
        })}
      </div>

      <ConstructorElement
        type="bot"
        isLocked={true}
        text={ingredients[1].name + " (низ)"}
        price={ingredients[1].price}
        thumbnail={ingredients[1].image}
      />
    </section>
  )
}
