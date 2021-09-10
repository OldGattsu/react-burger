import { createReducer } from '@reduxjs/toolkit'

import {
  addIngredient,
  removeIngredient,
  sortIngredient,
  clearConstructor,
} from '../actions/burgerConstructor'

const initialState = {
  data: [],
}

const burgerConstructor = createReducer(initialState, (builder) => {
  builder
    .addCase(addIngredient, (state, action) => {
      const selectedInredient = action.payload
      const hasBun = state.data.find((ingredient) => {
        return ingredient.type === 'bun'
      })
      if (selectedInredient.type === 'bun' && hasBun) {
        const bunIndex = state.data.findIndex((ingredient) => {
          return ingredient.type === 'bun'
        })
        state.data[bunIndex] = selectedInredient
      } else {
        const countSameIngredients = state.data.filter((ingredient) => {
          return ingredient._id === selectedInredient._id
        }).length
        state.data.push({...selectedInredient, index: countSameIngredients})
      }
    })
    .addCase(clearConstructor, (state, action) => {
      state.data = []
    })
    .addCase(removeIngredient, (state, action) => {
      state.data = state.data.filter((ingredient) => {
        return !((ingredient._id === action.payload.id)
          && (ingredient.index === action.payload.index))
      })
    })
    .addCase(sortIngredient, (state, action) => {
      const dragIngredient = state.data[action.payload.dragIndex]
      state.data.splice(action.payload.dragIndex, 1)
      state.data.splice(action.payload.hoverIndex, 0, dragIngredient)
    })
})

export default burgerConstructor