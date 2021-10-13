import { RootState } from '../types'
import { Middleware } from 'redux'
import { wsActions } from '..'

export type WsActions = typeof wsActions

export const createSocketMiddleware = (
  wsUrl: string,
  wsActions: WsActions
): Middleware<{}, RootState> => {
  const socketMiddleware: Middleware<{}, RootState> = (store) => {
    let socket: WebSocket | null = null
    return (next) => (action) => {
      const { dispatch } = store
      const { type } = action
      const { wsInit, wsStop, onOrder, onOpen, onClose, onError } = wsActions
      if (type === wsInit) {
        socket = new WebSocket(action.url)
        if (socket) {
          socket.onopen = (event) => {
            dispatch({ type: onOpen, payload: event })
          }
        }

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event })
        }

        socket.onmessage = (event) => {
          const { data } = event
          const parsedData = JSON.parse(data)
          const { success, ...restParsedData } = parsedData

          dispatch({ type: onOrder, payload: restParsedData })
        }

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event })
        }
      }

      if (socket && type === wsStop) {
        socket.close()
        socket = null
      }

      next(action)
    }
  }
  return socketMiddleware
}
