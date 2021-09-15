import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import {
  sendRequest,
  REGISTRATION,
  LOGIN,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  LOGOUT,
  REFRESH_TOKEN,
} from "../../utils/api-helper"

export const registration = createAsyncThunk(
  'user/registration',
  async(data) => sendRequest(REGISTRATION, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  })
)

export const login = createAsyncThunk(
  'user/login',
  async(data) => sendRequest(LOGIN, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  })
)

export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async(data) => sendRequest(FORGOT_PASSWORD, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  })
)

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async(data) => sendRequest(RESET_PASSWORD, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  })
)

export const logout = createAsyncThunk(
  'user/logout',
  async(data) => sendRequest(LOGOUT, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  })
)

export const refreshToken = createAsyncThunk(
  'user/refreshToken',
  async(data) => sendRequest(REFRESH_TOKEN, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  })
)

export const clearOrderId = createAction('order/clearOrder')