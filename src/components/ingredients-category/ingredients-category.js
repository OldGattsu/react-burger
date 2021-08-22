import React from 'react';
import propTypes from 'prop-types';
import clsx from 'clsx';
import styles from './ingredients-category.module.css';

import IngredientCard from '../ingredient-card/ingredient-card';

const IngredientsCategory = React.forwardRef(({name, data, onCardShow}, ref) => {
  return (
    <div className={styles.ingredientsCategory} ref={ref}>
      <h2 className="text text_type_main-medium">{name}</h2>
      <div className={clsx(
        styles.ingredientsCategoryContainer,
        'pt-6', 'pb-10', 'pl-4', 'pr-2',
      )}>
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

IngredientsCategory.propTypes = {
  name: propTypes.string,
  data: propTypes.array,
  onCardShow: propTypes.func,
}

export default IngredientsCategory