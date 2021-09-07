const API_PATH = process.env.REACT_APP_API_PATH

// endpoints
export const INGREDIENTS = 'ingredients'
export const ORDERS = 'orders'

const checkReponse = (res) => {
  return res.ok
    ? res.json()
    : res.json().then((err) => Promise.reject(err))
}

export function sendRequest(endpoint, options) {
  return fetch(`${API_PATH}/${endpoint}`, options)
   .then(checkReponse)
}