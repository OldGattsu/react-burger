import { createReducer } from '@reduxjs/toolkit'
import { setShownIngredient, unsetShownIngredient } from '../actions/ingredient'

const initialState = {
  data: {},
}

const ingredientReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setShownIngredient, (state, action) => {
      state.data = action.payload
    })
    .addCase(unsetShownIngredient, (state) => {
      state.data = {}
    })
})

export default ingredientReducer
