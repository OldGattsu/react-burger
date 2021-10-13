import { createAction } from '@reduxjs/toolkit'

export const wsSetIngredients = createAction('ws/setIngredients')
export const wsConnectionStart = createAction('ws/connectionStart')
export const wsConnectionStop = createAction('ws/connectionStop')
export const wsConnectionSuccess = createAction('ws/connectionSuccess')
export const wsConnectionClosed = createAction('ws/connectionClosed')
export const wsConnectionError = createAction('ws/connectionError')