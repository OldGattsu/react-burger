import React from 'react'
import clsx from 'clsx'
import styles from './burger-constructor.module.css'

import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import Loader from '../loader/loader'

import { sendRequest, ORDERS } from '../../utils/api-helper'
import { IngredientsContext } from '../../contexts/burgerConstructorContext'
import { getScrollBoxHeight } from '../../utils/methods'

export default function BurgerConstructor() {
  // get ingredients from context
  const ingredients = React.useContext(IngredientsContext)
  const selectedBun = ingredients[0]

  // width of BurgerConstructor
  const burgerConstructorRef = React.useRef(null)
  const burgerConstructorScrollRef = React.useRef(null)

  const setBurgerConstructorScrollHeight = () => {
    const height = getScrollBoxHeight(burgerConstructorRef.current, 'burgerConstructorScroll')
    burgerConstructorScrollRef.current.style.height = height
  }

  React.useEffect(() => {
    setBurgerConstructorScrollHeight()
    window.addEventListener('resize', setBurgerConstructorScrollHeight)

    return () => {
      window.removeEventListener('resize', setBurgerConstructorScrollHeight)
    }
  }, [])


  // order details
  const [orderDetails, setOrderDetails] = React.useState({
    show: false,
    orderId: null,
    loading: false,
  })

  const closeOrderDetails = () => setOrderDetails({
    show: false,
    data: [],
  })

  const getIngredientsIds = () => {
    const ingredientsIds = ingredients.map((ingredient) => {
      return ingredient._id
    })

    return {
      "ingredients": ingredientsIds,
    }
  }

  const checkout = () => {
    setOrderDetails({
      ...orderDetails,
      loading: true,
    })

    sendRequest(ORDERS, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(getIngredientsIds()),
    })
      .then((data) => {
        setOrderDetails({
          show: true,
          orderId: data.order.number,
          loading: false,
        })
      })
      .catch(() => {
        setOrderDetails({
          ...orderDetails,
          loading: false,
        })
      })
  }


  // total
  const [totalPrice, setTotalPrice] = React.useState(0)
  const getTotalPrice = React.useMemo(() => () => {
    let result = ingredients.reduce((priceSum, ingredient) => {
      return ingredient.type !== 'bun'
        ? priceSum += +ingredient.price
        : priceSum
    }, 0)
    result += selectedBun.price * 2
    setTotalPrice(result)
  }, [ingredients])

  React.useEffect(() => {
    getTotalPrice()
  }, [ingredients, getTotalPrice])

  return (
    <>
      <section
        className={clsx(
          styles.burgerConstructor,
          'mt-25', 'mb-10',
        )}
        ref={burgerConstructorRef}
      >
        <div className={clsx(
          styles.lockedBun,
          'mb-2', 'mr-4',
        )}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={selectedBun.name + " (верх)"}
            price={selectedBun.price}
            thumbnail={selectedBun.image}
          />
        </div>
        <div
          className={clsx(
            styles.burgerConstructorScroll,
            'pl-4', 'pr-2',
          )}
          ref={burgerConstructorScrollRef}
        >
          {ingredients.map((ingredient) => {
            return ingredient.type !== 'bun'
              ? (
                <div className={styles.ingredientContainer} key={ingredient._id}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image_large}
                  />
                </div>
              )
              : null
          })}
        </div>
        <div className={clsx(
          styles.lockedBun,
          'mt-2', 'mr-4',
        )}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={selectedBun.name + " (низ)"}
            price={selectedBun.price}
            thumbnail={selectedBun.image}
          />
        </div>
        <div className={clsx(
          styles.burgerConstructorOrder,
          'mt-10', 'pr-4',
        )}>
          <p className={clsx(
            styles.burgerConstructorTotal,
            'mr-10',
          )}>
            <span className={`text text_type_digits-medium mr-2`}>{totalPrice}</span>
            <CurrencyIcon type="primary" />
          </p>
          <Button type="primary" size="large" onClick={checkout}>
            Оформить заказ
          </Button>
        </div>
      </section>
      {orderDetails.loading && (<Loader />)}
      {orderDetails.show && (
        <Modal
          onClose={closeOrderDetails}
        >
          <OrderDetails orderId={orderDetails.orderId} />
        </Modal>
      )}
    </>
  )
}