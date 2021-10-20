import { createReducer } from '@reduxjs/toolkit'
import { setShownIngredient, unsetShownIngredient } from '../actions/ingredient'

import { IIngredient } from '../../types/ingredient'

export interface IIngredientState {
  data: IIngredient | {}
}

const initialState: IIngredientState = {
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
