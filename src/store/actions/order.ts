import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { sendRequest, ORDERS } from '../../utils/api-helper'
import { IIngredient } from '../../types/ingredient'


export const getOrderId = createAsyncThunk<IIngredient, number[]>(
  'order/getOrderId',
  async (ids: number[]) =>
    sendRequest(ORDERS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ids),
    })
)

export const clearOrderId = createAction('order/clearOrder')
