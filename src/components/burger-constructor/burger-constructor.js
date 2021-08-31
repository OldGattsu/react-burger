import React from 'react'
import clsx from 'clsx'
import styles from './burger-constructor.module.css'

import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import Loader from '../loader/loader'

import { IngredientsContext } from '../../utils/burgerConstructorContext'
import { getScrollBoxHeight } from '../../utils/methods'

export default function BurgerConstructor() {
  // get ingredients from context
  const {ingredients} = React.useContext(IngredientsContext)

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
  const checkoutApi = 'https://norma.nomoreparties.space/api/orders'
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
      "ingredients": ingredientsIds
    }
  }

  const checkout = () => {
    setOrderDetails({
      ...orderDetails,
      loading: true,
    })

    fetch(checkoutApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(getIngredientsIds()),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then(data => setOrderDetails({
        show: true,
        orderId: data.order.number,
        loading: false,
      }))
      .catch(e => {
        setOrderDetails({
          ...orderDetails,
          loading: false,
        })
        console.log('Ошибка: ' + e.message)
        console.log(e.response)
      })
  }


  // total
  const totalPriceReducer = React.useMemo(() => () => {
    return ingredients.reduce((priceSum, ingredient) => {
      return priceSum += +ingredient.price
    }, 0)
  }, [ingredients])
  const [totalPrice, totalPriceDispatch] = React.useReducer(totalPriceReducer, 0)

  React.useEffect(() => {
    totalPriceDispatch()
  }, [ingredients])

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
            text={ingredients[0].name + " (верх)"}
            price={ingredients[0].price}
            thumbnail={ingredients[0].image}
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
            text={ingredients[0].name + " (низ)"}
            price={ingredients[0].price}
            thumbnail={ingredients[0].image}
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