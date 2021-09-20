import { useMemo } from 'react'
import clsx from 'clsx'
import styles from './ingredient.module.css'

import { useSelector } from 'react-redux'

import { useParams } from 'react-router-dom'

import { IngredientDetails, Loader } from "../../components"

export default function Ingredient() {
  const { id } = useParams()
  const {
    ingredients,
    ingredientsPending,
    ingredientsRejected,
  } = useSelector(state => {
    return {
      ingredients: state.ingredients.data,
      ingredientsPending: state.ingredients.ingredientsPending,
      ingredientsRejected: state.ingredients.ingredientsRejected,
    }
  })

  const currentIngredient = useMemo(() => {
    if (!ingredients.length) return {}
    return ingredients.filter(ingredient => (
      ingredient._id === id
    ))[0]
  }, [id, ingredients])

  if (ingredientsPending) return (<Loader/>)
  if (ingredientsRejected) return (<div>error</div>)

  return (
    <section className={styles.ingredient}>
      <h1 className={clsx(
        'text', 'text_type_main-large',
        'pl-10', 'pr-10',
      )}>Детали ингредиента</h1>
      {Object.keys(currentIngredient).length > 0 &&
        <IngredientDetails
          name={currentIngredient.name}
          imageLarge={currentIngredient.image_large}
          calories={currentIngredient.calories}
          proteins={currentIngredient.proteins}
          fat={currentIngredient.fat}
          carbohydrates={currentIngredient.carbohydrates}
        />
      }
    </section>
  )
}