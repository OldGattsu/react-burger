import { createReducer } from '@reduxjs/toolkit'
import {
  getOrderRequest,
  getOrderSuccess,
  getOrderFailed,
  clearOrderId,
} from '../actions/order'

const initialState = {
  orderId: null,
  orderRequest: false,
  orderSuccess: false,
  orderFailed: false,
}

const orderReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getOrderRequest, (state) => {
      state.orderRequest = true
    })
    .addCase(getOrderSuccess, (state, action) => {
      state.orderId = action.payload.order.number
      state.orderSuccess = true
      state.orderRequest = false
      state.orderFailed = false
    })
    .addCase(getOrderFailed, (state) => {
      state.orderFailed = true
      state.orderRequest = false
    })
    .addCase(clearOrderId, (state) => {
      state.orderId = null
    })
})

export default orderReducer