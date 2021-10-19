import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { sendRequest, ORDERS } from '../../utils/api-helper'
import { getCookie } from '../../utils/methods'

import { IOrder } from '../types/order'

interface IIds {
  ingredients: string[]
}

export const getOrderId = createAsyncThunk<IOrder, IIds, any>(
  'order/getOrderId',
  async (ids) => {
    const res: any = await sendRequest(ORDERS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: getCookie('access_token'),

      },
      body: JSON.stringify(ids),
    })
    return res.order
  }
)

export const clearOrderId = createAction<void>('order/clearOrder')

export const showOrderModal = createAction<IOrder | null>('order/showModal')
export const closeOrderModal = createAction<void>('order/closeModal')