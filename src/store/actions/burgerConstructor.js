import { createAction } from '@reduxjs/toolkit'

export const addIngredient = createAction('constructor/addIngredient')
export const removeIngredient = createAction('constructor/removeIngredient')

export const moveIngredient = (item) => (dispatch, getState) => {
  const ingredients = getState().ingredients.data
  const selectedIngredient = ingredients.find((ingredient) => {
    return ingredient._id === item.id
  })
  dispatch(addIngredient(selectedIngredient));
};

