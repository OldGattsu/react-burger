import { createReducer } from '@reduxjs/toolkit'
import {
  getIngredientsRequest,
  getIngredientsSuccess,
  getIngredientsFailed,
} from "../actions/ingredients"

const initialState = {
  data: [],
  ingredientsRequest: false,
  ingredientsSuccess: false,
  ingredientsFailed: false,
}

const ingredientsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getIngredientsRequest, (state) => {
      state.ingredientsRequest = true
    })
    .addCase(getIngredientsSuccess, (state, action) => {
      state.data = action.payload.data
      state.ingredientsRequest = false
      state.ingredientsFailed = false
    })
    .addCase(getIngredientsFailed, (state) => {
      state.ingredientsFailed = true
      state.ingredientsRequest = false
    })
})

export default ingredientsReducer