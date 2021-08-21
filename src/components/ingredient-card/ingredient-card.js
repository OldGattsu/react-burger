import React from 'react';
import styles from './ingredient-card.module.css';

import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export default function IngredientCard({img, price, name, onShow}) {
  return (
    <div
      className={styles.ingredientCard}
      onClick={onShow}
    >
      <img className={styles.ingredientCardImage} src={img} alt={name} />
      <p className={styles.ingredientCardPrice}>
        <span className="mr-2">{price}</span>
        <CurrencyIcon type="primary" />
      </p>
      <p className={styles.ingredientCardName}>{name}</p>
      <Counter count={1} size="default" />
    </div>
  )
}