import { FC } from 'react'
import styles from './order-card.module.css'
import clsx from 'clsx'

import { useCallback } from 'react'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch } from '../../store/hooks'
import { showOrderModal } from '../../store/actions/order'

import { IOrderCard } from './order-card.types'

const OrderCard: FC<IOrderCard> = ({ order, fromFeed }) => {
  const history = useHistory()
  const location = useLocation()
  const { url } = useRouteMatch()
  const dispatch = useDispatch()

  const handleClick = useCallback(() => {
    dispatch(showOrderModal(order))
    history.push({
      pathname: `${url}/${order._id}`,
      state: { background: location },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const iconToRender = order.ingredients.slice(0, 5)
  return (
    <article className={clsx(styles.card, 'p-6')} onClick={handleClick}>
      <div className={styles.info}>
        <p className={clsx('text', 'text_type_digits-default', 'mb-6')}>
          #{order.number}
        </p>
        <h2 className={clsx('text', 'text_type_main-medium', 'mb-2')}>
          {order.name}
        </h2>
        {!fromFeed && (
          <p className={clsx('text', 'text_type_main-default', 'mb-6')}>
            Создан
          </p>
        )}
      </div>
      <div className={styles.icons}>
        {iconToRender.map((icon) => (
          <div className={styles.pict} key={icon.key}>
            <img
              className={styles.img}
              src={icon.image_mobile}
              alt={icon.name}
            />
          </div>
        ))}
      </div>
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
          {order.price}
        </span>
        <CurrencyIcon type='primary' />
      </div>
    </article>
  )
}

export default OrderCard
