import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { sendRequest, INGREDIENTS } from "../../utils/api-helper"

// export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST'
// export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS'
// export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED'

export const getIngredientsRequest = createAction('ingredients/getIngredientsRequest')
export const getIngredientsSuccess = createAction('ingredients/getIngredientsSuccess')
export const getIngredientsFailed = createAction('ingredients/getIngredientsFailed')


export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async(dispatch) => {
    // dispatch(getIngredientsRequest);
    sendRequest(INGREDIENTS)
      .then(data => {
        dispatch(getIngredientsSuccess({data}));
      })
      .catch(() => {
        dispatch(getIngredientsFailed());
      })
    }
)