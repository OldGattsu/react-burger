import { createReducer } from '@reduxjs/toolkit'
import { getOrderId, clearOrderId } from '../actions/order'

export interface IOrderState {
  orderId: number | null
  orderPending: boolean
  orderFulfilled: boolean
  orderRejected: boolean
}

const initialState: IOrderState = {
  orderId: null,
  orderPending: false,
  orderFulfilled: false,
  orderRejected: false,
}

const orderReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getOrderId.pending, (state) => {
      state.orderPending = true
    })
    .addCase(getOrderId.fulfilled, (state, action) => {
      state.orderId = action.payload.order.number
      state.orderFulfilled = true
      state.orderPending = false
      state.orderRejected = false
    })
    .addCase(getOrderId.rejected, (state) => {
      state.orderRejected = true
      state.orderPending = false
    })
    .addCase(clearOrderId, (state) => {
      state.orderId = null
    })
})

export default orderReducer
