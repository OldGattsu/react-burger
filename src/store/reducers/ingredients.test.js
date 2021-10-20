import { getIngredients } from '../actions/ingredients'
import ingredientsReducer from './ingredients'

const initialState = {
  data: [],
  ingredientsPending: false,
  ingredientsFulfilled: false,
  ingredientsRejected: false,
}

describe('user reducer', () => {
  it('return initial state', () => {
    expect(ingredientsReducer(undefined, {})).toEqual(initialState)
  })
  it('get ingredients', () => {
    const input = {
      '1': 1,
      '2': 2,
    }

    const output = {
      data: {
        '1': 1,
        '2': 2,
      },
      ingredientsFulfilled: true,
      ingredientsPending: false,
      ingredientsRejected: false,
    }

    expect(ingredientsReducer({}, getIngredients.fulfilled(input))).toEqual(
      output
    )
  })
})
