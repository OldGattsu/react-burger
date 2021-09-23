import { createAction } from '@reduxjs/toolkit'

export const addIngredient = createAction('burgerConstructor/addIngredient')
export const removeIngredient = createAction(
  'burgerConstructor/removeIngredient'
)
export const sortIngredient = createAction('burgerConstructor/sortIngredient')
export const clearConstructor = createAction(
  'burgerConstructor/clearConstructor'
)

export const moveIngredient = (item) => (dispatch, getState) => {
  const ingredients = getState().ingredients.data
  const selectedIngredient = ingredients.find((ingredient) => {
    return ingredient._id === item.id
  })
  dispatch(addIngredient(selectedIngredient))
}
