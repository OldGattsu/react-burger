import { createReducer } from '@reduxjs/toolkit'
import { getIngredients } from '../actions/ingredients'

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
})

export default ingredientsReducer
