import { createReducer } from '@reduxjs/toolkit'

import {
  addIngredient,
  removeIngredient,
} from '../actions/burgerConstructor'

const initialState = {
  selectedIngredients: [],
}

const burgerConstructor = createReducer(initialState, (builder) => {
  builder
    .addCase(addIngredient, (state, action) => {
      const selectedInredient = action.payload
      const countSameIngredients = state.selectedIngredients.filter((ingredient) => {
        return ingredient._id === selectedInredient._id
      }).length
      if (selectedInredient.type === 'bun' && countSameIngredients) {
        const bunIndex = state.selectedIngredients.findIndex((ingredient) => {
          return ingredient.type === 'bun'
        })
        state.selectedIngredients[bunIndex] = selectedInredient
      } else {
        state.selectedIngredients.push({...selectedInredient, index: countSameIngredients})
      }
    })
    .addCase(removeIngredient, (state, action) => {
      const removableIngredient = action.payload
      state.selectedIngredients = state.selectedIngredients.filter((ingredient) => {
        return !((ingredient._id === removableIngredient._id)
          && (ingredient.index === removableIngredient.index))
      })
    })
})

export default burgerConstructor