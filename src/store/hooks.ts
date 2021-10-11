import {
  TypedUseSelectorHook,
  useDispatch as dispatch,
  useSelector as selector,
} from 'react-redux'
import { AppDispatch, RootState } from './types'

export const useSelector: TypedUseSelectorHook<RootState> = selector
export const useDispatch = () => dispatch<AppDispatch>()
