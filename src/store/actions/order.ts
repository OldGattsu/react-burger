import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { sendRequest, ORDERS } from '../../utils/api-helper'
import { IOrder } from '../../types/order'
import { IThunkApi } from '../types'

export const getOrderId = createAsyncThunk<IOrder, number[], IThunkApi>(
  'order/getOrderId',
  async (ids) =>
    sendRequest(ORDERS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ids),
    })
)

export const clearOrderId = createAction<void>('order/clearOrder')
