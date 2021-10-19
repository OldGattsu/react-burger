const API_PATH = process.env.REACT_APP_API_PATH

// endpoints
export const INGREDIENTS = 'ingredients'
export const ORDERS = 'orders'
export const REGISTRATION = 'auth/register'
export const LOGIN = 'auth/login'
export const FORGOT_PASSWORD = 'password-reset'
export const RESET_PASSWORD = 'password-reset/reset'
export const LOGOUT = 'auth/logout'
export const REFRESH_TOKEN = 'auth/token'
export const USER = 'auth/user'

const checkReponse = (res: any) => {
  return res.ok
    ? res.json()
    : res.json().then((err: Error) => Promise.reject(err))
}

export function sendRequest(endpoint: string, options?: any) {
  return fetch(`${API_PATH}/${endpoint}`, options)
   .then(checkReponse)
}