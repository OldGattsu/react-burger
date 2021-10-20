import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import { createSocketMiddleware } from './middlewares/socket'

import {
  WS_CONNECTION_START,
  WS_CONNECTION_STOP,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_ORDERS,
} from './constants/ws'

const wsUrl = 'wss://norma.nomoreparties.space/orders/all'

export const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsStop: WS_CONNECTION_STOP,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onOrder: WS_GET_ORDERS,
}

const wsOrdersMiddleware = createSocketMiddleware(wsUrl, wsActions)

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk, wsOrdersMiddleware],
  devTools: process.env.NODE_ENV !== 'production',
})

export default store
