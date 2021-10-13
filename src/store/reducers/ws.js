import { createReducer } from '@reduxjs/toolkit'
import { wsSetIngredients, wsConnectionSuccess, wsConnectionClosed} from '../actions/ws';
// import { nanoid } from 'nanoid'


const initialState = {
  wsConnected: false,
  ingredients: [],
  orders: { orders: [], total: 0, totalToday: 0 },
};

const websocket = createReducer(initialState, (builder) => {
  builder
    .addCase(wsSetIngredients, (state, action) => {
      state.ingredients = action.ingredients
    })
    .addCase(wsConnectionSuccess, (state) => {
      state.wsConnected = true
    })
    .addCase(wsConnectionClosed, (state) => {
      state.wsConnected = false
    })
})

export default websocket