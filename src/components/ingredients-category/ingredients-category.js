import { forwardRef } from 'react'
import propTypes from 'prop-types'
import clsx from 'clsx'
import styles from './ingredients-category.module.css'

import IngredientCard from '../ingredient-card/ingredient-card'

const IngredientsCategory = forwardRef(({name, data, onCardShow}, ref) => {
  return (
    <div className={styles.ingredientsCategory} ref={ref}>
      <h2 className="text text_type_main-medium">{name}</h2>
      <div className={clsx(
        styles.ingredientsCategoryContainer,
        'pt-6', 'pb-10', 'pl-4', 'pr-2',
      )}>
        {data.map((ingredient) => {
          return (
            <IngredientCard
              id={ingredient._id}
              img={ingredient.image}
              price={ingredient.price}
              name={ingredient.name}
              count={ingredient.count}
              key={ingredient._id}
              onShow={() => onCardShow(ingredient)}
            />
          )
        })}
      </div>
    </div>
  )
})

IngredientsCategory.propTypes = {
  name: propTypes.string.isRequired,
  data: propTypes.array.isRequired,
  onCardShow: propTypes.func.isRequired,
}

export default IngredientsCategory