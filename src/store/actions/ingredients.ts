import { createAsyncThunk } from '@reduxjs/toolkit'
import { sendRequest, INGREDIENTS } from '../../utils/api-helper'
import { TIngredients } from '../../types/ingredient'

export const getIngredients = createAsyncThunk<TIngredients, void, any>(
  'ingredients/getIngredients',
  async () => {
    const res = await sendRequest(INGREDIENTS)
    return res.data
  }
)
