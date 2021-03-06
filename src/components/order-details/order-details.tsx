import clsx from 'clsx'
import styles from './order-details.module.css'

import orderDoneImg from '../../images/order-done.svg'

import { FC } from 'react'

const OrderDetails: FC<{ orderId: number }> = ({ orderId }) => {
  return (
    <div className={styles.orderDetails}>
      <p className={clsx(styles.orderDetailsId, 'mb-15')}>
        <span
          className={clsx(
            styles.orderDetailsIdValue,
            'text',
            'text_type_digits-large',
            'mb-8'
          )}
        >
          {orderId}
        </span>
        <span
          className={clsx(
            styles.orderDetailsIdHint,
            'text',
            'text text_type_main-medium'
          )}
        >
          идентификатор заказа
        </span>
      </p>
      <img
        className={clsx(styles.orderImage, 'mb-15')}
        src={orderDoneImg}
        alt='Order done'
      />
      <p className={styles.orderDetailsDone}>
        <span className={clsx('text', 'text text_type_main-small', 'mb-2')}>
          Ваш заказ начали готовить
        </span>
        <span
          className={clsx(
            'text',
            'text text_type_main-small',
            'text_color_inactive'
          )}
        >
          Дождитесь готовности на орбитальной станции
        </span>
      </p>
    </div>
  )
}

export default OrderDetails
