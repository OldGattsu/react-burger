import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import {
  sendRequest,
  REGISTRATION,
  LOGIN,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  LOGOUT,
  REFRESH_TOKEN,
  USER,
} from '../../utils/api-helper'

import { setCookie, getCookie, deleteCookie } from '../../utils/methods'

import { IUser, ILogin } from '../../types/user'
import { ISuccessMessage } from '../../types/success'
import { IThunkApi } from '../types'

export const resetStatuses = createAction('user/resetStatuses')

export const registration = createAsyncThunk<ILogin, IUser, IThunkApi>(
  'user/registration',
  async (data) =>
    sendRequest(REGISTRATION, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(({ accessToken, refreshToken, user }) => {
      setCookie('access_token', accessToken)
      setCookie('refresh_token', refreshToken)
      return user
    })
)

export const login = createAsyncThunk<ILogin, IUser, IThunkApi>(
  'user/login',
  async (data) =>
    sendRequest(LOGIN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(({ accessToken, refreshToken, user }) => {
      setCookie('access_token', accessToken, { expires: 2000 })
      setCookie('refresh_token', refreshToken, { expires: 2000 })
      return user
    })
)

export const forgotPassword = createAsyncThunk<
  ISuccessMessage,
  { email: string },
  IThunkApi
>('user/forgotPassword', async (data) =>
  sendRequest(FORGOT_PASSWORD, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
)

export const resetPassword = createAsyncThunk<
  ISuccessMessage,
  {
    email: string
    token: string
  },
  IThunkApi
>('user/resetPassword', async (data) =>
  sendRequest(RESET_PASSWORD, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
)

export const logout = createAsyncThunk<
  ISuccessMessage | void,
  { token: string },
  IThunkApi
>('user/logout', async () =>
  sendRequest(LOGOUT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      token: getCookie('refresh_token'),
    }),
  }).then(() => {
    deleteCookie('access_token')
    deleteCookie('refresh_token')
  })
)

export const refreshToken = createAsyncThunk<ISuccessMessage | void, void, IThunkApi>(
  'user/refreshToken',
  async (_, { dispatch, rejectWithValue }) =>
    sendRequest(REFRESH_TOKEN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: getCookie('refresh_token') }),
    })
      .then(({ accessToken, refreshToken }) => {
        setCookie('access_token', accessToken, { expires: 2000 })
        setCookie('refresh_token', refreshToken, { expires: 2000 })
        dispatch(getUser())
      })
      .catch(() => {
        return rejectWithValue('Not authenticated, please login.')
      })
)

export const getUser = createAsyncThunk<{ user: IUser }, void, any>(
  'user/getUser',
  async (_, { dispatch, rejectWithValue }) =>
    await sendRequest(USER, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: getCookie('access_token'),
      },
    }).catch((err) => {
      dispatch(refreshToken())
      return rejectWithValue(err)
    })
)

export const updateUser = createAsyncThunk<{ user: IUser }, IUser, IThunkApi>(
  'user/updateUser',
  async (data) =>
    sendRequest(USER, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: getCookie('access_token'),
      },
      body: JSON.stringify(data),
    })
)