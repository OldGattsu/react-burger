import { useEffect, FC } from 'react'
import styles from './order.module.css'
import clsx from 'clsx'

import { useParams } from 'react-router-dom'
import { wsConnectionStart, wsConnectionStop } from '../../store/actions/ws'
import { useDispatch, useSelector } from '../../store/hooks'
import { getCookie } from '../../utils/methods'

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const Order: FC = () => {
  const dispatch = useDispatch()
  const { currentOrder } = useSelector((state) => state.order)
  const { orders } = useSelector((state) => state.websocket)
  const { id } = useParams<{ id: string }>()
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

  const order = currentOrder || orders.orders.find((order) => order._id === id)

  if (!order) {
    return null
  }

  return (
    <section className={styles.order}>
      <p
        className={clsx(
          styles.number,
          'text',
          'text_type_digits-default',
          'mb-10'
        )}
      >
        #{order?.number}
      </p>
      <h2 className={clsx('text', 'text_type_main-medium', 'mb-3')}>
        {order?.name}
      </h2>
      <p className={clsx('text', 'text_type_main-default', 'mb-15')}>Создан</p>
      <p className={clsx('text', 'text_type_main-medium', 'mb-6')}>Состав:</p>
      <ul className={clsx(styles.itemsList, 'pr-6')}>
        {order?.ingredients.map((item) => (
          <li className={styles.item} key={item.key}>
            <div className={clsx(styles.pict, 'mr-4')}>
              <img
                className={styles.img}
                src={item.image_mobile}
                alt={item.name}
              />
            </div>
            <p
              className={clsx(
                styles.itemName,
                'text',
                'text_type_main-default'
              )}
            >
              {item.name}
            </p>
            <div className={styles.priceContainer}>
              <span className={clsx('text', 'text_type_digits-default')}>
                1 x {item.price}
              </span>
              <CurrencyIcon type='primary' />
            </div>
          </li>
        ))}
      </ul>
      <div className={clsx(styles.info, 'mt-10')}>
        <span
          className={clsx(
            styles.date,
            'text',
            'text_type_main-default',
            'text_color_inactive'
          )}
        >
          {order.createdAt}
        </span>
        <div className={styles.priceContainer}>
          <span className={clsx('text', 'text_type_digits-default', 'mr-2')}>
            678
          </span>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </section>
  )
}

export default Order
