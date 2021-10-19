import {
  registration,
  login,
  forgotPassword,
  resetPassword,
  logout,
  refreshToken,
  getUser,
  updateUser,
  resetStatuses,
} from '../actions/user'
import userReducer from './user'

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

describe('user reducer', () => {
  it('return initial state', () => {
    expect(userReducer(undefined, {})).toEqual(initialState)
  })
  it('registration', () => {
    const input = {
      accessToken: '123',
      refreshToken: '456',
      user: {
        name: 'artyom',
        email: 'krasavin-00@mail.ru',
      },
    }

    const output = {
      registrationFulfilled: true,
      registrationPending: false,
      user: {
        email: 'krasavin-00@mail.ru',
        name: 'artyom',
      },
      accessToken: '123',
      refreshToken: '456',
      isLoggedIn: true,
    }

    expect(userReducer({}, registration.fulfilled(input))).toEqual(output)
  })
  it('login', () => {
    const input = {
      accessToken: '123',
      refreshToken: '456',
      user: {
        name: 'artyom',
        email: 'krasavin-00@mail.ru',
      },
    }

    const output = {
      loginFulfilled: true,
      loginPending: false,
      user: {
        email: 'krasavin-00@mail.ru',
        name: 'artyom',
      },
      accessToken: '123',
      refreshToken: '456',
      isLoggedIn: true,
    }

    expect(userReducer({}, login.fulfilled(input))).toEqual(output)
  })
  it('logout', () => {
    const previousState = {
      logoutFulfilled: true,
      logoutPending: false,
      isLoggedIn: false,
      user: {
        name: 'artyom',
        email: 'artyom@asd.ru',
      },
      accessToken: null,
      refreshToken: null,
    }
    const input = {
      accessToken: '123',
    }

    const output = {
      logoutFulfilled: true,
      logoutPending: false,
      isLoggedIn: false,
      user: null,
      accessToken: null,
      refreshToken: null,
    }

    expect(userReducer(previousState, logout.fulfilled(input))).toEqual(output)
  })
  it('forgotPassword', () => {
    const input = {
      password: '123',
    }

    const output = {
      forgotPasswordFulfilled: true,
      forgotPasswordPending: false,
    }

    expect(userReducer({}, forgotPassword.fulfilled(input))).toEqual(output)
  })
  it('resetPassword', () => {
    const output = {
      resetPasswordFulfilled: true,
      resetPasswordPending: false,
    }

    expect(userReducer({}, resetPassword.fulfilled())).toEqual(output)
  })
  it('getUser', () => {
    const input = {
      user: {
        name: 'artyom',
        email: 'asdas@asd.ru',
      },
    }
    const output = {
      getUserFulfilled: true,
      getUserPending: false,
      isLoggedIn: true,
      isUserLoaded: true,
      user: {
        name: 'artyom',
        email: 'asdas@asd.ru',
      },
    }

    expect(userReducer({}, getUser.fulfilled(input))).toEqual(output)
  })
})
