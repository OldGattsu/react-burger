import { combineReducers } from 'redux'

import ingredients from './ingredients'
import burgerConstructor from './burgerConstructor'
import ingredient from './ingredient'
import order from './order'
import user from './user'

const rootReducer = combineReducers({
  ingredients,
  burgerConstructor,
  ingredient,
  order,
  user,
})

export default rootReducer