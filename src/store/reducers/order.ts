import { createReducer } from '@reduxjs/toolkit'
import { IOrder } from '../../types/order'
import { getOrderId, clearOrderId, showOrderModal, closeOrderModal } from '../actions/order'

export interface IOrderState {
  orderId: number | null
  orderPending: boolean
  orderFulfilled: boolean
  orderRejected: boolean
  orderModal: boolean,
  currentOrder: IOrder | null,
}

const initialState: IOrderState = {
  orderId: null,
  orderPending: false,
  orderFulfilled: false,
  orderRejected: false,
  orderModal: false,
  currentOrder: null,
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
    .addCase(showOrderModal, (state, action) => {
      state.orderModal = true
      state.currentOrder = action.payload
    })
    .addCase(closeOrderModal, (state) => {
      state.orderModal = false
      state.currentOrder = null
    })
})

export default orderReducer
