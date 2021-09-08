import { createAction } from '@reduxjs/toolkit'
import { sendRequest, ORDERS } from "../../utils/api-helper"

export const getOrderRequest = createAction('order/getOrderRequest')
export const getOrderSuccess = createAction('order/getOrderSuccess')
export const getOrderFailed = createAction('order/getOrderFailed')

export const clearOrderId = createAction('order/clearOrder')

export const getOrderId = (ids) => (dispatch) => {
  dispatch(getOrderRequest())
  sendRequest(ORDERS, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(ids),
  })
    .then(data => {
      dispatch(getOrderSuccess(data));
    })
    .catch(() => {
      dispatch(getOrderFailed());
    })
}
