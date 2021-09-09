import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import clsx from 'clsx';
import styles from './burger-ingredients.module.css';

import ingredientsPropTypes from '../../prop-types/prop-types';

import { useDispatch, useSelector } from 'react-redux';
import {
  setShownIngredient,
  unsetShownIngredient,
} from '../../store/actions/ingredient';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import IngredientsCategory from '../ingredients-category/ingredients-category';
import IngredientDetails from '../ingredient-details/ingredient-details';

import { getScrollBoxHeight, getAbsoluteHeight } from '../../utils/methods';

export default function BurgerIngredients({ingredients}) {
  const didMount = React.useRef(false)
  const dispatch = useDispatch()

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


  // categories
  const categoryBunsRef = React.useRef(null)
  const categorySaucesRef = React.useRef(null)
  const categoryToppingsRef = React.useRef(null)

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
      value: 'buns',
    },
    {
      name: 'Соусы',
      data: sauces,
      ref: categorySaucesRef,
      value: 'sauces',
    },
    {
      name: 'Начинка',
      data: toppings,
      ref: categoryToppingsRef,
      value: 'toppings',
    },
  ]

  const getCurrentCategory = () => {
    burgerIngredientsScrollRef.current.addEventListener('scroll', () => {
      const scrollDistance = burgerIngredientsScrollRef.current.scrollTop
      const heightOfOtherContent = burgerIngredientsScrollRef.current.offsetTop
      categoriesList.forEach((category) => {
        const categoryTopPosition = category.ref.current.offsetTop - heightOfOtherContent
        if (
          scrollDistance >= categoryTopPosition
          && scrollDistance <= categoryTopPosition + getAbsoluteHeight(category.ref.current)
        ) {
          setCurrentTab(category.value)
        }
      })
    })
  }

  React.useEffect(() => {
    getCurrentCategory()
  }, [categoriesList])


  // tabs
  const [currentTab, setCurrentTab] = React.useState('buns')

  const goToCategory = (category) => {
    const relativeTop = window.scrollY > burgerIngredientsScrollRef.current.offsetTop
      ? window.scrollY
      : burgerIngredientsScrollRef.current.offsetTop
    const scrollTo = {
      'buns': () => burgerIngredientsScrollRef.current.scrollTo({
        behavior: "smooth",
        top: categoryBunsRef.current.offsetTop - relativeTop,
      }),
      'sauces': () => burgerIngredientsScrollRef.current.scrollTo({
        behavior: "smooth",
        top: categorySaucesRef.current.offsetTop - relativeTop,
      }),
      'toppings': () => burgerIngredientsScrollRef.current.scrollTo({
        behavior: "smooth",
        top: categoryToppingsRef.current.offsetTop - relativeTop,
      }),
    }

    scrollTo[category]()
  }


  // ingredient details
  const shownIngredient = useSelector(state => state.ingredient.data)

  const showIngredientModal = (ingredient) => {
    dispatch(setShownIngredient(ingredient))
  }

  const closeIngredientModal = () => {
    dispatch(unsetShownIngredient())
  }


  return (
    <>
      <section className={styles.burgerIngredients} ref={burgerIngredientsRef}>
        <h1 className={clsx(
          'text', 'text_type_main-large',
          'pt-10',
        )}>Соберите бургер</h1>
        <div className={clsx(
          styles.burgerIngredientsTabs,
          'mt-5',
        )}>
          {categoriesList.map((category, index) => (
            <Tab
              value={category.value}
              active={currentTab === category.value}
              key={index}
              onClick={() => goToCategory(category.value)}
            >{category.name}</Tab>
          ))}
        </div>
        <div
          className={clsx(
            styles.burgerIngredientsScroll,
            'mt-10',
          )}
          ref={burgerIngredientsScrollRef}
        >
          {categoriesList.map((category, index) => (
            <IngredientsCategory
              name={category.name}
              data={category.data}
              ref={category.ref}
              key={index}
              onCardShow={showIngredientModal}
            />
          ))}
        </div>
      </section>
      {Object.keys(shownIngredient).length > 0 && (
        <Modal
          title="Детали ингредиента"
          onClose={closeIngredientModal}
        >
          <IngredientDetails
            data={shownIngredient}
          />
        </Modal>
      )}
    </>
  )
}

BurgerIngredients.propTypes = {
  ingredients: propTypes.arrayOf(ingredientsPropTypes).isRequired,
}
