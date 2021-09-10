import { combineReducers } from 'redux'

import ingredients from './ingredients'
import burgerConstructor from './burgerConstructor'
import ingredient from './ingredient'
import order from './order'

const rootReducer = combineReducers({
  ingredients,
  burgerConstructor,
  ingredient,
  order,
})

export default rootReducer