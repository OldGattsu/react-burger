import { createReducer } from '@reduxjs/toolkit'
import { wsSetIngredients, wsConnectionSuccess, wsConnectionClosed, wsGetOrders} from '../actions/ws';
import { nanoid } from 'nanoid'

import { IIngredient, TIngredients } from '../../types/ingredient';
import { IOrders, IOrder } from '../types/order'


interface IWebsocketState {
  wsConnected: boolean
  ingredients: TIngredients,
  orders: IOrders,
}

const initialState: IWebsocketState = {
  wsConnected: false,
  ingredients: [],
  orders: { orders: [], total: 0, totalToday: 0 },
};

const websocket = createReducer(initialState, (builder) => {
  builder
    .addCase(wsSetIngredients.fulfilled, (state, action) => {
      state.ingredients = action.payload
    })
    .addCase(wsConnectionSuccess, (state) => {
      state.wsConnected = true
    })
    .addCase(wsConnectionClosed, (state) => {
      state.wsConnected = false
    })
    .addCase(wsGetOrders, (state, action) => {
      let saturatedOrders: IOrder[] = [];
      if (!action.payload?.orders || action.payload?.orders.length === 0)
        return { ...state };
      for (let order of action.payload.orders) {
        const ingredients = order.ingredients.map((ingredient) => {
          const saturatedIngredient = state.ingredients.find(
            (item) => item._id === ingredient
          ) as IIngredient
          const key = nanoid(4);

          return { ...saturatedIngredient, key };
        });

        const price = ingredients.reduce((acc, ingredient) => {
          return acc + ingredient.price
        }, 0);

        saturatedOrders = [
          ...saturatedOrders,
          { ...order, ingredients, price },
        ];

        state.orders.orders = saturatedOrders || []
        state.orders.total = action.payload.total
        state.orders.totalToday = action.payload.totalToday
    }
  })
})

export default websocket