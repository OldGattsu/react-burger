import {
  getOrderId,
  clearOrderId,
  showOrderModal,
  closeOrderModal,
} from '../actions/order'
import orderReducer from './order'

const initialState = {
  orderId: null,
  orderPending: false,
  orderFulfilled: false,
  orderRejected: false,
  orderModal: false,
  currentOrder: null,
}

describe('order reducer', () => {
  it('return initial state', () => {
    expect(orderReducer(undefined, {})).toEqual(initialState)
  })
  it('get order id', () => {
    const input = {
      number: 1,
    }

    const output = {
      orderFulfilled: true,
      orderId: 1,
      orderPending: false,
      orderRejected: false,
    }

    expect(orderReducer({}, getOrderId.fulfilled(input))).toEqual(output)
  })
  it('clearOrderId', () => {
    const previousState = {
      orderId: 1,
    }
    const output = {
      orderId: null,
    }

    expect(orderReducer(previousState, clearOrderId())).toEqual(output)
  })
  it('show order modal', () => {
    const input = {
      id: 'hi',
      name: 'ho',
    }
    const output = {
      orderModal: true,
      currentOrder: {
        id: 'hi',
        name: 'ho',
      },
    }

    expect(orderReducer({}, showOrderModal(input))).toEqual(output)
  })
  it('close order modal', () => {
    const previousState = {
      currentOrder: {
        id: 1,
      }
    }
    const output = {
      orderModal: false,
      currentOrder: null,
    }

    expect(orderReducer(previousState, closeOrderModal())).toEqual(output)
  })
})
