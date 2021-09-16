import { createReducer } from '@reduxjs/toolkit'
import {
  registration,
  login,
  forgotPassword,
  resetPassword,
  logout,
  refreshToken,
} from "../actions/user"

import {
  setCookie,
  getCookie,
  deleteCookie
} from '../../utils/methods'

const initialState = {
  user: {},
  isLoggedIn: false,
  accessToken: null,
  refreshToken: null,

  registrationPending: false,
  registrationFulfilled: false,
  registrationRejected: false,

  loginPending: false,
  loginFulfilled: false,
  loginRejected: false,

  forgotPasswordPending: false,
  forgotPasswordFulfilled: false,
  forgotPasswordRejected: false,

  resetPasswordPending: false,
  resetPasswordFulfilled: false,
  resetPasswordRejected: false,

  logoutPending: false,
  logoutFulfilled: false,
  logoutRejected: false,

  refreshTokenPending: false,
  refreshTokenFulfilled: false,
  refreshTokenRejected: false,
}

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(registration.pending, (state) => {
      state.registrationPending = true
    })
    .addCase(registration.fulfilled, (state, action) => {
      state.registrationFulfilled = true
      state.registrationPending = false
      state.user = action.payload.user
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      setCookie('access_token', state.accessToken)
      setCookie('refresh_token', state.refreshToken)
    })
    .addCase(registration.rejected, (state) => {
      state.registrationRejected = true
      state.registrationPending = false
    })

    .addCase(login.pending, (state) => {
      state.ingredientsPending = true
    })

    .addCase(forgotPassword.pending, (state) => {
      state.forgotPasswordPending = true
    })
    .addCase(forgotPassword.fulfilled, (state, action) => {
      state.forgotPasswordFulfilled = true
      state.forgotPasswordPending = false
    })
    .addCase(forgotPassword.rejected, (state) => {
      state.forgotPasswordRejected = true
      state.forgotPasswordPending = false
    })

    .addCase(resetPassword.pending, (state) => {
      state.resetPasswordPending = true
    })
    .addCase(resetPassword.fulfilled, (state, action) => {
      state.resetPasswordFulfilled = true
      state.resetPasswordPending = false
    })
    .addCase(resetPassword.rejected, (state) => {
      state.resetPasswordRejected = true
      state.resetPasswordPending = false
    })
})

export default userReducer