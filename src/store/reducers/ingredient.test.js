import {
  setShownIngredient, unsetShownIngredient
} from '../actions/ingredient'
import ingredientReducer from './ingredient'

const initialState = {
  data: {},
}

describe('ingredient reducer', () => {
  it('return initial state', () => {
    expect(ingredientReducer(undefined, {})).toEqual(initialState)
  })
  it('set shown ingredient', () => {
    const input = {
      id: 1,
    }

    const output = {
      data: {
        id: 1,
      }
    }

    expect(ingredientReducer({}, setShownIngredient(input))).toEqual(output)
  })
  it('unset shown ingredient', () => {
    const previousState = {
      data: {
        id: 1,
      }
    }
    const output = {
      data: {},
    }

    expect(ingredientReducer(previousState, unsetShownIngredient())).toEqual(output)
  })
})
