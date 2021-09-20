import { createReducer } from '@reduxjs/toolkit'
import {
  registration,
  login,
  forgotPassword,
  resetPassword,
  getUser,
  updateUser,
  logout,
  refreshToken,
  resetStatuses,
} from "../actions/user"

const initialState = {
  user: null,
  isLoggedIn: false,
  isUserLoaded: false,
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

  getUserPending: false,
  getUserFulfilled: false,
  getUserRejected: false,

  updateUserPending: false,
  updateUserFulfilled: false,
  updateUserRejected: false,

  logoutPending: false,
  logoutFulfilled: false,
  logoutRejected: false,

  refreshTokenPending: false,
  refreshTokenFulfilled: false,
  refreshTokenRejected: false,
}

const userReducer = createReducer(initialState, (builder) => {
  builder
    //reset statuses
    .addCase(resetStatuses, (state, action) => {
      const group = action.payload
      state[`${group}Pending`] = false
      state[`${group}Fulfilled`] = false
      state[`${group}Rejected`] = false
    })

    // registration
    .addCase(registration.pending, (state) => {
      state.registrationPending = true
    })
    .addCase(registration.fulfilled, (state, action) => {
      state.registrationFulfilled = true
      state.registrationPending = false
      state.user = action.payload
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      state.isLoggedIn = true
    })
    .addCase(registration.rejected, (state) => {
      state.registrationRejected = true
      state.registrationPending = false
    })

    // login
    .addCase(login.pending, (state) => {
      state.loginPending = true
    })
    .addCase(login.fulfilled, (state, action) => {
      state.loginFulfilled = true
      state.loginPending = false
      state.user = action.payload
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      state.isLoggedIn = true
    })
    .addCase(login.rejected, (state) => {
      state.loginRejected = true
      state.loginPending = false
    })

    // logout
    .addCase(logout.pending, (state) => {
      state.logoutPending = true
    })
    .addCase(logout.fulfilled, (state, action) => {
      state.logoutFulfilled = true
      state.logoutPending = false
      state.isLoggedIn = false
      state.user = null
      state.accessToken = null
      state.refreshToken = null
    })
    .addCase(logout.rejected, (state) => {
      state.logoutRejected = true
      state.logoutPending = false
    })

    // forgot password
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

    // reset password
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

    // get user
    .addCase(getUser.pending, (state) => {
      state.getUserPending = true
    })
    .addCase(getUser.fulfilled, (state, action) => {
      state.getUserFulfilled = true
      state.getUserPending = false
      state.user = action.payload.user
      state.isLoggedIn = true
      state.isUserLoaded = true
    })
    .addCase(getUser.rejected, (state) => {
      state.getUserRejected = true
      state.getUserPending = false
      state.isUserLoaded = true
    })

    // update user
    .addCase(updateUser.pending, (state) => {
      state.updateUserPending = true
    })
    .addCase(updateUser.fulfilled, (state, action) => {
      state.updateUserFulfilled = true
      state.updateUserPending = false
      state.user = action.payload.user
    })
    .addCase(updateUser.rejected, (state) => {
      state.updateUserRejected = true
      state.updateUserPending = false
    })
})

export default userReducer
