import { createReducer } from '@reduxjs/toolkit'
import {
  getIngredients,
  incrementIngredientCount,
  decrementIngredientCount,
} from "../actions/ingredients"

const initialState = {
  data: [],
  ingredientsPending: false,
  ingredientsFulfilled: false,
  ingredientsRejected: false,
}

const ingredientsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getIngredients.pending, (state) => {
      state.ingredientsPending = true
    })
    .addCase(getIngredients.fulfilled, (state, action) => {
      state.data = action.payload.data
      state.ingredientsFulfilled = true
      state.ingredientsPending = false
      state.ingredientsRejected = false
    })
    .addCase(getIngredients.rejected, (state) => {
      state.ingredientsRejected = true
      state.ingredientsPending = false
    })
    .addCase(incrementIngredientCount, (state, action) => {
      const ingredientIndex = state.data.findIndex((ingredient) => {
        return ingredient._id === action.payload.id
      })
      if (state.data[ingredientIndex].type !== 'bun') {
        state.data[ingredientIndex].count > 0
          ? state.data[ingredientIndex].count++
          : state.data[ingredientIndex].count = 1
      } else {
        state.data.forEach(ingredient => {
          if (ingredient.type === 'bun') ingredient.count = 0
        })
        state.data[ingredientIndex].count = 2
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