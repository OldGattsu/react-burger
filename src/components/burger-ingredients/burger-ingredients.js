import React from 'react';
import styles from './burger-ingredients.module.css';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import { getScrollBoxHeight } from '../../libs/methods';

export default function BurgerIngredients({ingredients}) {
  const [currentTab, setCurrentTab] = React.useState('buns')

  const burgerIngredientsRef = React.useRef(null)
  const burgerIngredientsScrollRef = React.useRef(null)

  React.useEffect(() => {
    setBurgerIngredientsScrollHeight()
    window.addEventListener('resize', setBurgerIngredientsScrollHeight)
  }, [])

  const setBurgerIngredientsScrollHeight = () => {
    const height = getScrollBoxHeight(burgerIngredientsRef.current, 'burgerIngredientsScroll')
    burgerIngredientsScrollRef.current.style.height = height
  }

  const getCategory = (type) => {
    const res = []
    ingredients.forEach((ingredient) => {
      if (ingredient.type === type) res.push(ingredient)
    })
    return res
  }

  const buns = getCategory('bun')
  const sauces = getCategory('sauce')
  const toppings = getCategory('main')

  const IngredientCard = ({img, price, name}) => {
    return (
      <div className={styles.ingredientCard}>
        <img className={styles.ingredientImage} src={img} />
        <p className={styles.ingredientPrice}>{price}</p>
        <p className={styles.ingredientName}>{name}</p>
      </div>
    )
  }

  const IngredientsCategory = ({name, list}) => {
    return (
      <div className={styles.burgerIngredientsCategory}>
        <h2 className="text text_type_main-medium">{name}</h2>
        {list.map((ingredient, index) => {
          return (
            <IngredientCard
              img={ingredient.image}
              price={ingredient.price}
              name={ingredient.name}
              key={index}
            />
          )
        })}
      </div>
    )
  }

  return (
    <section className={styles.burgerIngredients} ref={burgerIngredientsRef}>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <div style={{ display: 'flex' }}>
        <Tab value="buns" active={currentTab === 'buns'} onClick={setCurrentTab}>
          Булки
        </Tab>
        <Tab value="sauces" active={currentTab === 'sauces'} onClick={setCurrentTab}>
          Соусы
        </Tab>
        <Tab value="toppings" active={currentTab === 'toppings'} onClick={setCurrentTab}>
          Начинки
        </Tab>
      </div>
      <div className={styles.burgerIngredientsScroll} ref={burgerIngredientsScrollRef}>
        <IngredientsCategory name="Булки" list={buns} />
        <IngredientsCategory name="Соусы" list={sauces} />
        <IngredientsCategory name="Начинка" list={toppings} />
      </div>
    </section>
  )
}