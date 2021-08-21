import React from 'react';
import styles from './burger-constructor.module.css';

import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../order-details/order-details';

import { getScrollBoxHeight } from '../../libs/methods';

export default function BurgerConstructor({ingredients}) {
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
  const [orderDetailsShow, setOrderDetailsShow] = React.useState(false)

  const showOrderDetails = () => setOrderDetailsShow(true)
  const closeOrderDetails = () => setOrderDetailsShow(false)

  return (
    <>
      <section
        className={styles.burgerConstructor}
        ref={burgerConstructorRef}
      >
        <div className={styles.topBun}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={ingredients[0].name + " (верх)"}
            price={ingredients[0].price}
            thumbnail={ingredients[0].image}
          />
        </div>
        <div
          className={styles.burgerConstructorScroll}
          ref={burgerConstructorScrollRef}
        >
          {ingredients.map((ingredient, index) => {
            return (
              <div className={styles.ingredientContainer}>
                <DragIcon type="primary" />
                <ConstructorElement
                  text={ingredient.name}
                  price={ingredient.price}
                  thumbnail={ingredient.image_large}
                  key={index}
                />
              </div>
            )
          })}
        </div>
        <div className={styles.botBun}>
          <ConstructorElement
            type="bot"
            isLocked={true}
            text={ingredients[1].name + " (низ)"}
            price={ingredients[1].price}
            thumbnail={ingredients[1].image}
          />
        </div>
        <div className={styles.burgerConstructorOrder}>
          <p className={`${styles.burgerConstructorTotal} mr-10`}>
            <span className={`text text_type_digits-medium mr-2`}>610</span>
            <CurrencyIcon type="primary" />
          </p>
          <Button type="primary" size="large" onClick={showOrderDetails}>
            Оформить заказ
          </Button>
        </div>
      </section>
      <OrderDetails
        show={orderDetailsShow}
        onClose={closeOrderDetails}
      />
    </>
  )
}
