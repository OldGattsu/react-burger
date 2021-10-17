import store from '..'
import rootReducer from '../reducers'
import { Dispatch } from 'react'

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = Dispatch<any>

export interface IThunkApi {
  dispatch: AppDispatch
  state: RootState
}
