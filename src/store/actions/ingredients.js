import { createAction } from '@reduxjs/toolkit'
import { sendRequest, INGREDIENTS } from "../../utils/api-helper"

export const getIngredientsRequest = createAction('ingredients/getIngredientsRequest')
export const getIngredientsSuccess = createAction('ingredients/getIngredientsSuccess')
export const getIngredientsFailed = createAction('ingredients/getIngredientsFailed')

export const getIngredients = () => (dispatch) => {
  dispatch(getIngredientsRequest())
  sendRequest(INGREDIENTS)
    .then(data => {
      dispatch(getIngredientsSuccess(data));
    })
    .catch(() => {
      dispatch(getIngredientsFailed());
    })
}
