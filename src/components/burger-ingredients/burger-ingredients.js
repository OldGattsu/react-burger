import React from 'react';
import styles from './burger-ingredients.module.css';

import { Tab, Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../ingredient-details/ingredient-details';

import { getScrollBoxHeight } from '../../libs/methods';

export default function BurgerIngredients({ingredients}) {
  const [currentTab, setCurrentTab] = React.useState('buns')

  const burgerIngredientsRef = React.useRef(null)
  const burgerIngredientsScrollRef = React.useRef(null)

  const setBurgerIngredientsScrollHeight = () => {
    const height = getScrollBoxHeight(burgerIngredientsRef.current, 'burgerIngredientsScroll')
    burgerIngredientsScrollRef.current.style.height = height
  }

  React.useEffect(() => {
    setBurgerIngredientsScrollHeight()
    window.addEventListener('resize', setBurgerIngredientsScrollHeight)

    return () => {
      window.removeEventListener('resize', setBurgerIngredientsScrollHeight)
    }
  }, [])

  const categoryBunsRef = React.useRef(null)
  const categorySaucesRef = React.useRef(null)
  const categoryToppingsRef = React.useRef(null)

  const tabScroll = React.useCallback(() => {
    const scrollTo = {
      'buns': () => categoryBunsRef.current.scrollIntoView({behavior: 'smooth'}),
      'sauces': () => categorySaucesRef.current.scrollIntoView({behavior: 'smooth'}),
      'toppings': () => categoryToppingsRef.current.scrollIntoView({behavior: 'smooth'}),
    }

    scrollTo[currentTab]()
  }, [currentTab])

  React.useEffect(() => {
    tabScroll()
  }, [tabScroll, currentTab])

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
        <img className={styles.ingredientCardImage} src={img} alt={name} />
        <p className={styles.ingredientCardPrice}>
          <span className="mr-2">{price}</span>
          <CurrencyIcon type="primary" />
        </p>
        <p className={styles.ingredientCardName}>{name}</p>
        <Counter count={1} size="default" />
      </div>
    )
  }

  const IngredientsCategory = React.forwardRef(({name, list}, ref) => {
    return (
      <div className={styles.ingredientsCategory} ref={ref}>
        <h2 className="text text_type_main-medium">{name}</h2>
        <div className={styles.ingredientsCategoryContainer}>
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
      </div>
    )
  })

  return (
    <>
      <section className={styles.burgerIngredients} ref={burgerIngredientsRef}>
        <h1 className={styles.burgerIngredientsTitle}>Соберите бургер</h1>
        <div className={styles.burgerIngredientsTabs}>
          <Tab value="buns" active={currentTab === 'buns'} onClick={setCurrentTab}>Булки</Tab>
          <Tab value="sauces" active={currentTab === 'sauces'} onClick={setCurrentTab}>Соусы</Tab>
          <Tab value="toppings" active={currentTab === 'toppings'} onClick={setCurrentTab}>Начинки</Tab>
        </div>
        <div className={styles.burgerIngredientsScroll} ref={burgerIngredientsScrollRef}>
          <IngredientsCategory name="Булки" list={buns} ref={categoryBunsRef} />
          <IngredientsCategory name="Соусы" list={sauces} ref={categorySaucesRef} />
          <IngredientsCategory name="Начинка" list={toppings} ref={categoryToppingsRef} />
        </div>
      </section>
      <IngredientDetails
        image={ingredients[0].image_large}
        name={ingredients[0].name}
        calories={ingredients[0].calories}
        proteins={ingredients[0].proteins}
        fat={ingredients[0].fat}
        carbohydrates={ingredients[0].carbohydrates}
      />
    </>
  )
}