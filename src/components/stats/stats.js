import { useSelector } from 'react-redux'
import statsStyles from './stats.module.css'

function Stats() {
  const { orders } = useSelector((state) => state.ws)

  const finishedOrders = orders.orders
    .filter((order) => order.status === 'done')
    .slice(0, 20)

  const inWorkOrders = orders.orders
    .filter((order) => order.status === 'pending')
    .slice(0, 20)

  return (
    <>
      <section className='mt-25'>
        <div className={statsStyles.orders}>
          <div className={statsStyles.ordersContainer}>
            <p className='text text_type_main-medium mb-6'>Готовы:</p>
            <ul className={statsStyles.orderList}>
              {finishedOrders.map((order) => (
                <li key={order._id}>
                  <p className='text text_type_digits-default mb-2'>
                    {order.number}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className={statsStyles.ordersContainer}>
            <p className='text text_type_main-medium mb-6'>В работе:</p>
            <ul className={statsStyles.orderList}>
              {inWorkOrders.map((order) => (
                <li key={order._id}>
                  <p className='text text_type_digits-default mb-2'>
                    {order.number}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className='text text_type_main-medium mt-15'>
          Выполнено за все время:
        </p>
        <p className='text text_type_digits-large mb-15'>{orders.total}</p>
        <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
        <p className='text text_type_digits-large'>{orders.totalToday}</p>
      </section>
    </>
  )
}

export default Stats
