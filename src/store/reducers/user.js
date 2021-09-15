import { createReducer } from '@reduxjs/toolkit'
import {
  registration,
  login,
  forgotPassword,
  resetPassword,
  logout,
  refreshToken,
} from "../actions/user"

const initialState = {
  user: {},
  isLogged: false,
  accessToken: null,
  refreshToken: null,

  registrationSuccess: false,
  registrationPending: false,
  registrationFulfilled: false,
  registrationRejected: false,

  loginPending: false,
  loginFulfilled: false,
  loginRejected: false,

  forgotPasswordSuccess: false,
  forgotPasswordPending: false,
  forgotPasswordFulfilled: false,
  forgotPasswordRejected: false,

  resetPasswordSuccess: false,
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

const ingredientsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(registration.pending, (state) => {
      state.registrationPending = true
    })
    .addCase(registration.fulfilled, (state, action) => {
      state.registrationFulfilled = true
      state.registrationPending = false

      if (action.payload.success) {
        state.registrationSuccess = true
        state.user = action.payload.user
        state.accessToken = action.payload.accessToken
        state.refreshToken = action.payload.refreshToken
      }
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

      if (action.payload.success) {
        state.forgotPasswordSuccess = true
      }
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

      if (action.payload.success) {
        state.forgotPasswordSuccess = true
      }
    })
    .addCase(resetPassword.rejected, (state) => {
      state.resetPasswordRejected = true
      state.resetPasswordPending = false
    })
})

export default ingredientsReducer