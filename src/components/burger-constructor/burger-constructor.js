import React from 'react'
import clsx from 'clsx'
import styles from './burger-constructor.module.css'

import { useSelector, useDispatch } from 'react-redux'
import { moveIngredient, removeIngredient, sortIngredient } from '../../store/actions/burgerConstructor'
import { decrementIngredientCount, incrementIngredientCount } from '../../store/actions/ingredients'
import { getOrderId, clearOrderId } from '../../store/actions/order'

import { useDrop } from 'react-dnd'

import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import SelectedIngredientCard from '../selected-ingredient-card/selected-ingredient-card'
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import DragHere from '../drag-here/drag-here'
import Loader from '../loader/loader'

import { getScrollBoxHeight } from '../../utils/methods'

export default function BurgerConstructor() {
  const dispatch = useDispatch()

  // get ingredients from store
  const selectedIngredients = useSelector(state => state.burgerConstructor.data)
  const selectedBun = selectedIngredients.find((ingredient) => {
    return ingredient.type === 'bun'
  })


  // dnd
  const [{isDropping}, dropTarget] = useDrop({
    accept: 'ingredient',
    collect: monitor => ({
      isDropping: monitor.isOver()
    }),
    drop(id) {
      dispatch(moveIngredient(id))
      dispatch(incrementIngredientCount(id))
    }
  })


  // height of BurgerConstructor
  const burgerConstructorRef = React.useRef(null)
  const burgerConstructorScrollRef = React.useRef(null)

  const setBurgerConstructorScrollHeight = () => {
    const height = getScrollBoxHeight(burgerConstructorRef.current, 'burgerConstructorScroll')
    burgerConstructorScrollRef.current.style.height = height
  }

  React.useEffect(() => {
    setBurgerConstructorScrollHeight()
  }, [selectedIngredients])


  React.useEffect(() => {
    window.addEventListener('resize', setBurgerConstructorScrollHeight)

    return () => {
      window.removeEventListener('resize', setBurgerConstructorScrollHeight)
    }
  }, [])


  // ingredient
  const handleRemoveIngredient = (id, index) => {
    dispatch(removeIngredient({id, index}))
    dispatch(decrementIngredientCount(id))
  }

  const handleSortIngredient = (id, dragIndex, hoverIndex) => {
    dispatch(sortIngredient({ id, dragIndex, hoverIndex }))
  }


  // order
  const { orderId, orderRequest } = useSelector(state => {
    return {
      orderId: state.order.orderId,
      orderRequest: state.order.orderRequest,
    }
  })

  const getIngredientsIds = () => {
    const ingredientsIds = selectedIngredients.map((ingredient) => {
      return ingredient._id
    })

    return { "ingredients": ingredientsIds, }
  }

  const showOrderModal = () => {
    const ids = getIngredientsIds()
    dispatch(getOrderId(ids))
  }

  const closeOrderModal = () => {
    dispatch(clearOrderId())
  }


  // total
  const totalPrice = React.useMemo(() => {
    let result = selectedIngredients.reduce((priceSum, ingredient) => {
      return ingredient.type !== 'bun'
        ? priceSum += +ingredient.price
        : priceSum
    }, 0)
    if (selectedBun) result += selectedBun.price * 2
    return result;
  }, [selectedIngredients, selectedBun])

  return (
    <>
      <section
        className={clsx(
          'mt-25', 'mb-10',
        )}
        ref={dropTarget}
      >
        <div
          className={styles.burgerConstructor}
          ref={burgerConstructorRef}
        >
          {selectedIngredients.length === 0 && (<DragHere dragging={isDropping}/>)}
          {selectedBun && (
            <div className={clsx(
              styles.lockedBun,
              'mb-2', 'mr-2',
            )}>
              <ConstructorElement
                type="top"
                isLocked={true}
                text={selectedBun.name + " (верх)"}
                price={selectedBun.price}
                thumbnail={selectedBun.image}
              />
            </div>
          )}
          <div
            className={clsx(
              styles.burgerConstructorScroll,
              'pl-4', 'pr-2',
            )}
            ref={burgerConstructorScrollRef}
          >
            {selectedIngredients.map((ingredient, index) => {
              return ingredient.type !== 'bun'
                ? (
                  <SelectedIngredientCard
                    id={ingredient._id}
                    count={ingredient.index}
                    index={index}
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image_large}
                    handleClose={handleRemoveIngredient}
                    handleSort={handleSortIngredient}
                    key={index}
                  />
                )
                : null
            })}
          </div>
          {selectedBun && (
            <div className={clsx(
              styles.lockedBun,
              'mt-2', 'mr--4',
            )}>
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={selectedBun.name + " (низ)"}
                price={selectedBun.price}
                thumbnail={selectedBun.image}
              />
            </div>
          )}
          {selectedIngredients.length > 0 && (
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
              <Button type="primary" size="large" onClick={showOrderModal}>
                Оформить заказ
              </Button>
            </div>
          )}
        </div>
      </section>
      {orderRequest && (<Loader />)}
      {orderId && (
        <Modal
          onClose={closeOrderModal}
        >
          <OrderDetails orderId={orderId} />
        </Modal>
      )}
    </>
  )
}