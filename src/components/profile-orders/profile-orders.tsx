import { useEffect } from 'react'
import styles from './profile-orders.module.css'

import { useDispatch, useSelector } from '../../store/hooks'
import { wsConnectionStart, wsConnectionStop } from '../../store/actions/ws'
import { getCookie } from '../../utils/methods'

import { OrderCard, Loader } from '..'

function ProfileOrders() {
  const dispatch = useDispatch()
  const { orders } = useSelector((state) => state.websocket)
  const token = getCookie('access_token')

  useEffect(() => {
    dispatch(
      wsConnectionStart(
        `wss://norma.nomoreparties.space/orders?token=${
          token?.split('Bearer ')[1]
        }`
      )
    )
    return () => {
      dispatch(wsConnectionStop())
    }
  }, [dispatch, token])

  if (orders.orders.length === 0) {
    return <Loader />
  }

  return (
    <section className={styles.section}>
      {orders.orders.map((order) => (
        <OrderCard order={order} key={order._id} />
      ))}
    </section>
  )
}

export default ProfileOrders
