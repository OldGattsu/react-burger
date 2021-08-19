import React from 'react';
import styles from './burger-constructor.module.css';

import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { getAbsoluteHeight } from '../../libs/methods'

export default function BurgerConstructor({ingredients}) {
  const burgerConstructorRef = React.useRef(null)
  const burgerConstructorScrollRef = React.useRef(null)

  React.useEffect(() => {
    getBurgerConstructorScrollHeight()
    window.addEventListener('resize', getBurgerConstructorScrollHeight)

  }, [])

  const getBurgerConstructorScrollHeight = () => {
    const containerHeight = burgerConstructorRef.current.offsetHeight
    let heightRemainingElements = 0

    burgerConstructorRef.current.childNodes.forEach(el => {
      if (el.className.indexOf('burgerConstructorScroll') === -1) {
        heightRemainingElements += getAbsoluteHeight(el)
      }
    });

    burgerConstructorScrollRef.current.style.height = (containerHeight - heightRemainingElements) + 'px'
  }

  return (
    <section
      className={styles.burgerConstructor}
      ref={burgerConstructorRef}
    >
      <div className={styles.topBun}>
        <ConstructorElement
          className="adsad"
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
        {ingredients.map((ingredient) => {
          return (
            <div className={styles.ingredientContainer}>
              <DragIcon type="primary" />
              <ConstructorElement
                key={ingredient._id}
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image_large}
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
        <Button className="m" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>

    </section>
  )
}
