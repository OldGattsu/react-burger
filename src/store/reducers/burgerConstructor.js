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
      if (selectedInredient.type === 'bun' && state.selectedIngredients.length !== 0) {
        const bunIndex = state.selectedIngredients.findIndex((ingredient) => {
          return ingredient.type === 'bun'
        })
        state.selectedIngredients[bunIndex] = selectedInredient
      } else {
        const countSameIngredients = state.selectedIngredients.filter((ingredient) => {
          return ingredient._id === selectedInredient._id
        }).length
        state.selectedIngredients.push({...selectedInredient, index: countSameIngredients})
      }
    })
    .addCase(removeIngredient, (state, action) => {
      const removableIngredient = action.payload
      console.log('rem', removableIngredient)
      // console.log('rem i', removableIngredient.index)
      // console.log('rem id', removableIngredient._id)
      state.selectedIngredients = state.selectedIngredients.filter((ingredient) => {
        // console.log("ingredient", ingredient.index)
        console.log('check id', ingredient._id !== removableIngredient._id)
        console.log('check index', ingredient.index !== removableIngredient.index)
        return !(!(ingredient._id !== removableIngredient._id) && !(ingredient.index !== removableIngredient.index))
      })
    })
})

export default burgerConstructor