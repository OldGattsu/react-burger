import { createReducer } from '@reduxjs/toolkit'

import {
  addIngredient,
  removeIngredient,
  sortIngredient,
  clearConstructor,
} from '../actions/burgerConstructor'

import { nanoid } from 'nanoid'

const initialState = {
  selectedIngredients: [],
  selectedBun: null,
}

const burgerConstructor = createReducer(initialState, (builder) => {
  builder
    .addCase(addIngredient, (state, action) => {
      const newIngredient = action.payload
      if (newIngredient.type === 'bun') {
        state.selectedBun = newIngredient
      } else {
        state.selectedIngredients.push({ ...newIngredient, subId: nanoid(4) })
      }
    })
    .addCase(clearConstructor, (state) => {
      state.selectedIngredients = []
      state.selectedBun = null
    })
    .addCase(removeIngredient, (state, action) => {
      state.selectedIngredients = state.selectedIngredients.filter(
        (ingredient) => {
          return !(
            ingredient._id === action.payload.id &&
            ingredient.subId === action.payload.subId
          )
        }
      )
    })
    .addCase(sortIngredient, (state, action) => {
      const dragIngredient = state.selectedIngredients[action.payload.dragIndex]
      state.selectedIngredients.splice(action.payload.dragIndex, 1)
      state.selectedIngredients.splice(
        action.payload.hoverIndex,
        0,
        dragIngredient
      )
    })
})

export default burgerConstructor
