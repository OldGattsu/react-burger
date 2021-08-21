import React from 'react';
import clsx from 'clsx';
import styles from './burger-ingredients.module.css';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsCategory from '../ingredients-category/ingredients-category';
import IngredientDetails from '../ingredient-details/ingredient-details';

import { getScrollBoxHeight } from '../../libs/methods';

export default function BurgerIngredients({ingredients}) {
  // width of BurgerIngredients
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


  // tabs
  const [currentTab, setCurrentTab] = React.useState('buns')

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

  const tabsList = [
    {
      name: 'Булки',
      value: 'buns',
      activeFor: 'buns',
    },
    {
      name: 'Соусы',
      value: 'sauces',
      activeFor: 'sauces',
    },
    {
      name: 'Начинка',
      value: 'toppings',
      activeFor: 'toppings',
    }
  ]


  // ingredient details
  const [ingredientDetails, setIngredientDetails] = React.useState({
    show: false,
    data: {},
  })

  const showIngredientDetails = (curIngredient) => {
    setIngredientDetails({
      show: true,
      data: curIngredient,
    })
  }

  const closeIngredientDetails = () => {
    setIngredientDetails({
      show: false,
      data: {},
    })
  }


  // categories
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

  const categoriesList = [
    {
      name: 'Булки',
      data: buns,
      ref: categoryBunsRef,
    },
    {
      name: 'Соусы',
      data: sauces,
      ref: categorySaucesRef,
    },
    {
      name: 'Начинка',
      data: toppings,
      ref: categoryToppingsRef,
    },
  ]

  return (
    <>
      <section
        className={clsx(
          styles.burgerIngredients,
       )}
        ref={burgerIngredientsRef}
      >
        <h1 className={clsx(
          styles.burgerIngredientsTitle,
          'text', 'text_type_main-large',
          )}>Соберите бургер</h1>
        <div className={styles.burgerIngredientsTabs}>
          {tabsList.map((tab, index) => (
            <Tab
              value={tab.value}
              active={currentTab === tab.activeFor}
              key={index}
              onClick={setCurrentTab}
            >{tab.name}</Tab>
          ))}
        </div>
        <div className={styles.burgerIngredientsScroll} ref={burgerIngredientsScrollRef}>
          {categoriesList.map((category, index) => (
            <IngredientsCategory
              name={category.name}
              data={category.data}
              ref={category.ref}
              key={index}
              onCardShow={showIngredientDetails}
            />
          ))}
        </div>
      </section>
      <IngredientDetails
        show={ingredientDetails.show}
        data={ingredientDetails.data}
        onClose={closeIngredientDetails}
      />
    </>
  )
}