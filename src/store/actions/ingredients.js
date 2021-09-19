import { createAsyncThunk } from '@reduxjs/toolkit'
import { sendRequest, INGREDIENTS } from "../../utils/api-helper"

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async() => sendRequest(INGREDIENTS)
)