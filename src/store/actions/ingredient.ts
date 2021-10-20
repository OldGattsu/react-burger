import { createAction } from '@reduxjs/toolkit'
import { IIngredient } from '../../types/ingredient'


export const setShownIngredient = createAction<IIngredient>(
  'ingredient/setDisplayedIngredient'
)
export const unsetShownIngredient = createAction<void>(
  'ingredient/unsetDisplayedIngredient'
)
