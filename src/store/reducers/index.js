import { combineReducers } from 'redux'

import ingredients from './ingredients'
import constructorIngredients from './constructorIngredients'
import ingredient from './ingredient'
import order from './order'

const rootReducer = combineReducers({
  ingredients,
  constructorIngredients,
  ingredient,
  order,
})

export default rootReducer