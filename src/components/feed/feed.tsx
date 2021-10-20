import styles from './feed.module.css'
import clsx from 'clsx'

import { useSelector } from '../../store/hooks'
import { OrderCard } from '..'

function Feed() {
  const { orders } = useSelector((state) => state.websocket)

  return (
    <section>
      <h1 className={clsx('text', 'text_type_main-large', 'mt-10', 'mb-5')}>
        Лента заказов
      </h1>
      <div className={styles.orders}>
        {orders.orders.map((order) => (
          <OrderCard order={order} key={order._id} fromFeed />
        ))}
      </div>
    </section>
  )
}

export default Feed
