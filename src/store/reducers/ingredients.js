import { createReducer } from '@reduxjs/toolkit'
import {
  getIngredientsRequest,
  getIngredientsSuccess,
  getIngredientsFailed,
  incrementIngredientCount,
  decrementIngredientCount,
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
      state.ingredientsSuccess = true
      state.ingredientsRequest = false
      state.ingredientsFailed = false
    })
    .addCase(getIngredientsFailed, (state) => {
      state.ingredientsFailed = true
      state.ingredientsRequest = false
    })
    .addCase(incrementIngredientCount, (state, action) => {
      const ingredientIndex = state.data.findIndex((ingredient) => {
        return ingredient._id === action.payload.id
      })
      if (state.data[ingredientIndex].type !== 'bun') {
        state.data[ingredientIndex].count > 0
          ? state.data[ingredientIndex].count++
          : state.data[ingredientIndex].count = 1
      }
    })
    .addCase(decrementIngredientCount, (state, action) => {
      const ingredientIndex = state.data.findIndex((ingredient) => {
        return ingredient._id === action.payload
      })
      if (state.data[ingredientIndex].count) {
        state.data[ingredientIndex].count--
      }
    })
})

export default ingredientsReducer