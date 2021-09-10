import { createAction } from '@reduxjs/toolkit'

export const setShownIngredient = createAction('ingredient/setDisplayedIngredient')
export const unsetShownIngredient = createAction('ingredient/unsetDisplayedIngredient')