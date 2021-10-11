import { createAction } from '@reduxjs/toolkit'
import { IIngredient } from '../../types/ingredient'


export const setShownIngredient = createAction(
  'ingredient/setDisplayedIngredient'
)
export const unsetShownIngredient = createAction<IIngredient>(
  'ingredient/unsetDisplayedIngredient'
)
