import React from 'react';
import propTypes from 'prop-types';
import clsx from 'clsx';
import styles from './burger-constructor.module.css';

import ingredientsPropTypes from '../../utils/prop-types';

import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

import { getScrollBoxHeight } from '../../utils/methods';

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
            <span className={`text text_type_digits-medium mr-2`}>610</span>
            <CurrencyIcon type="primary" />
          </p>
          <Button type="primary" size="large" onClick={showOrderDetails}>
            Оформить заказ
          </Button>
        </div>
      </section>
      {orderDetailsShow && (
        <Modal
          onClose={closeOrderDetails}
        >
          <OrderDetails />
        </Modal>
      )}
    </>
  )
}

BurgerConstructor.propTypes = {
  ingredients: propTypes.arrayOf(ingredientsPropTypes).isRequired,
}
