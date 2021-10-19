import { useCallback } from 'react'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch } from '../../store/hooks'
import { showOrderModal } from '../../store/actions/order'
import orderStyles from './order-card.module.css'

import { FC } from 'react'
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
    <article className={`${orderStyles.card} p-6`} onClick={handleClick}>
      <div className={orderStyles.info}>
        <p className='text text_type_digits-default mb-6'>#{order.number}</p>
        <h2 className='text text_type_main-medium mb-2'>{order.name}</h2>
        {!fromFeed && (
          <p className='text text_type_main-default mb-6'>Создан</p>
        )}
      </div>
      <div className={orderStyles.icons}>
        {iconToRender.map((icon) => (
          <div className={orderStyles.pict} key={icon.key}>
            <img
              className={orderStyles.img}
              src={icon.image_mobile}
              alt={icon.name}
            />
          </div>
        ))}
      </div>
      <span
        className={`${orderStyles.date} text text_type_main-default text_color_inactive`}
      >
        {order.createdAt}
      </span>
      <div className={orderStyles.priceContainer}>
        <span className='text text_type_digits-default mr-2'>
          {order.price}
        </span>
        <CurrencyIcon type='primary' />
      </div>
    </article>
  )
}

export default OrderCard
