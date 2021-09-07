import React from 'react'
import clsx from 'clsx'
import styles from './burger-constructor.module.css'

import { useSelector, useDispatch } from 'react-redux'
import { moveIngredient, removeIngredient } from '../../store/actions/burgerConstructor'
import { decrementIngredientCount, incrementIngredientCount } from '../../store/actions/ingredients'

import { useDrop } from 'react-dnd'

import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import Loader from '../loader/loader'

import { sendRequest, ORDERS } from '../../utils/api-helper'
import { getScrollBoxHeight } from '../../utils/methods'

export default function BurgerConstructor() {
  // get ingredients from store
  const dispatch = useDispatch()
  const selectedIngredients = useSelector(state => state.burgerConstructor.selectedIngredients)
  const selectedBun = selectedIngredients.find((ingredient) => {
    return ingredient.type === 'bun'
  })

  // dnd
  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(id) {
      dispatch(moveIngredient(id))
      dispatch(incrementIngredientCount(id))
    }
  });

  // const [{ opacity }, ref] = useDrag({
  //   type: 'ingredient',
  //   item: { id },
  //   collect: monitor => ({
  //     opacity: monitor.isDragging() ? 0.5 : 1
  //   }),
  //   hover(item, monitor) {
  //     if (!ref.current) {
  //         return;
  //     }
  //     const dragIndex = item.index;
  //     const hoverIndex = index
  //     if (dragIndex === hoverIndex) {
  //         return;
  //     }
  //     const hoverBoundingRect = ref.current?.getBoundingClientRect();
  //     const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
  //     const clientOffset = monitor.getClientOffset();
  //     const hoverClientY = clientOffset.y - hoverBoundingRect.top;
  //     if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
  //         return;
  //     }
  //     if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
  //         return;
  //     }
  //     moveCard(dragIndex, hoverIndex);
  //     item.index = hoverIndex;
  //   },
  // });

  // width of BurgerConstructor
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
  const handleRemoveIngredient = (item) => {
    dispatch(removeIngredient(item))
    dispatch(decrementIngredientCount(item._id))
  }


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
    const ingredientsIds = selectedIngredients.map((ingredient) => {
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
          {selectedBun && (
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
                  <div className={styles.ingredientContainer} key={index}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                      text={ingredient.name}
                      price={ingredient.price}
                      thumbnail={ingredient.image_large}
                      handleClose={() => handleRemoveIngredient(ingredient)}
                    />
                  </div>
                )
                : null
            })}
          </div>
          {selectedBun && (
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
          )}
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