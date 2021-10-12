import { createAsyncThunk } from '@reduxjs/toolkit'
import { sendRequest, INGREDIENTS } from '../../utils/api-helper'
import { TIngredients } from '../../types/ingredient'
import { IThunkApi } from '../types'

export const getIngredients = createAsyncThunk<TIngredients, void, IThunkApi>(
  'ingredients/getIngredients',
  async () => {
    const res = await sendRequest(INGREDIENTS)
    return res.data
  }
)
