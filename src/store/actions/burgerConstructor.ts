import { createAction } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '../types'
import { IIngredient, TIngredients } from '../../types/ingredient'

export interface IRemoveIngredient {
  readonly id: number
  readonly subId: number
}

export interface ISortIngredient {
  readonly id: number
  readonly dragIndex: number
  readonly hoverIndex: number
}

export const addIngredient = createAction<IIngredient>(
  'burgerConstructor/addIngredient'
)
export const removeIngredient = createAction<IRemoveIngredient>(
  'burgerConstructor/removeIngredient'
)
export const sortIngredient = createAction<ISortIngredient>(
  'burgerConstructor/sortIngredient'
)
export const clearConstructor = createAction(
  'burgerConstructor/clearConstructor'
)

export const moveIngredient =
  (item: IIngredient) => (dispatch: AppDispatch, getState: () => RootState) => {
    const ingredients: TIngredients = getState().ingredients.data
    const selectedIngredient: any = ingredients.find(
      (ingredient: IIngredient) => {
        return ingredient._id === item.id
      }
    )
    dispatch(addIngredient(selectedIngredient))
  }
