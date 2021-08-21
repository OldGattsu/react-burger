import React from 'react';
import styles from './ingredients-category.module.css';

import IngredientCard from '../ingredient-card/ingredient-card';

const IngredientsCategory = React.forwardRef(({name, data, onCardShow}, ref) => {
  return (
    <div className={styles.ingredientsCategory} ref={ref}>
      <h2 className="text text_type_main-medium">{name}</h2>
      <div className={styles.ingredientsCategoryContainer}>
        {data.map((ingredient, index) => {
          return (
            <IngredientCard
              img={ingredient.image}
              price={ingredient.price}
              name={ingredient.name}
              key={index}
              onShow={() => onCardShow(ingredient)}
            />
          )
        })}
      </div>
    </div>
  )
})

export default IngredientsCategory