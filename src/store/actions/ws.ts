import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { sendRequest, INGREDIENTS } from '../../utils/api-helper'

import { IRawOrders } from '../types/order'

export const wsConnectionStart = createAction<string>('ws/connectionStart')
export const wsConnectionStop = createAction('ws/connectionStop')
export const wsConnectionSuccess = createAction('ws/connectionSuccess')
export const wsConnectionClosed = createAction('ws/connectionClosed')
export const wsConnectionError = createAction('ws/connectionError')

export const wsGetOrders = createAction<IRawOrders | undefined>('ws/getOrders')


export const wsSetIngredients = createAsyncThunk<any, any, any>(
  'ingredients/getIngredients',
  async () => {
    const res = await sendRequest(INGREDIENTS)
    return res.data
  }
)