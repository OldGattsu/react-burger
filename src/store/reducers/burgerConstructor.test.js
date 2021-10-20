import {
  addIngredient,
  removeIngredient,
  sortIngredient,
  clearConstructor,
} from '../actions/burgerConstructor'
import burgerConstructor from './burgerConstructor'

const initialState = {
  selectedIngredients: [],
  selectedBun: null,
}

describe('burger constructor reducer', () => {
  it('return initial state', () => {
    expect(burgerConstructor(undefined, {})).toEqual(initialState)
  })
  it('add ingredient', () => {
    const input = {
      id: 1,
      type: 'bun',
    }

    const output = {
      selectedBun: {
        id: 1,
        type: 'bun',
      },
    }

    expect(burgerConstructor({}, addIngredient(input))).toEqual(output)
  })
  it('remove ingredient', () => {
    const previousState = {
      selectedIngredients: [
        {
          _id: 1,
          subId: 2,
        },
        {
          id: 10,
          subId: 11,
        },
      ],
    }

    const input = {
      id: 1,
      subId: 2,
    }

    const output = {
      selectedIngredients: [
        {
          id: 10,
          subId: 11,
        },
      ],
    }

    expect(burgerConstructor(previousState, removeIngredient(input))).toEqual(
      output
    )
  })
  it('clear constructor', () => {
    const previousState = {
      selectedIngredients: [
        {
          id: 1,
          subId: 2,
        },
        {
          id: 10,
          subId: 11,
        },
      ],
      selectedBun: {
        id: 15,
      }
    }

    const output = {
      selectedIngredients: [],
      selectedBun: null,
    }

    expect(burgerConstructor(previousState, clearConstructor())).toEqual(output)
  })
  it('sort ingredient', () => {
    const previousState = {
      selectedIngredients: [
        {
          id: 1,
        },
        {
          id: 10,
        },
        {
          id: 11,
        },
      ],
    }

    const input = {
      hoverIndex: 0,
      dragIndex: 2,
    }

    const output = {
      selectedIngredients: [
        {
          id: 11,
        },
        {
          id: 1,
        },
        {
          id: 10,
        },
      ],
    }

    expect(burgerConstructor(previousState, sortIngredient(input))).toEqual(output)
  })
})
