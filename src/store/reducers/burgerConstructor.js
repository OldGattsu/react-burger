import { createReducer } from '@reduxjs/toolkit'

import {
  addIngredient,
  removeIngredient,
} from '../actions/burgerConstructor'

const initialState = {
  data: [],
}

const burgerConstructor = createReducer(initialState, (builder) => {
  builder
    .addCase(addIngredient, (state, action) => {
      const selectedInredient = action.payload
      const countSameIngredients = state.data.filter((ingredient) => {
        return ingredient._id === selectedInredient._id
      }).length
      if (selectedInredient.type === 'bun' && countSameIngredients) {
        const bunIndex = state.data.findIndex((ingredient) => {
          return ingredient.type === 'bun'
        })
        state.data[bunIndex] = selectedInredient
      } else {
        state.data.push({...selectedInredient, index: countSameIngredients})
      }
    })
    .addCase(removeIngredient, (state, action) => {
      const removableIngredient = action.payload
      state.data = state.data.filter((ingredient) => {
        return !((ingredient._id === removableIngredient._id)
          && (ingredient.index === removableIngredient.index))
      })
    })
})

export default burgerConstructor