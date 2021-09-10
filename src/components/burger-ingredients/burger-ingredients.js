import { useState, useEffect, useRef, useMemo } from 'react'
import propTypes from 'prop-types'
import clsx from 'clsx'
import styles from './burger-ingredients.module.css'

import ingredientsPropTypes from '../../prop-types/prop-types'

import { useDispatch, useSelector } from 'react-redux'
import {
  setShownIngredient,
  unsetShownIngredient,
} from '../../store/actions/ingredient'

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../modal/modal';
import IngredientsCategory from '../ingredients-category/ingredients-category'
import IngredientDetails from '../ingredient-details/ingredient-details'

import { getScrollBoxHeight, getAbsoluteHeight } from '../../utils/methods'

export default function BurgerIngredients({ingredients}) {
  const dispatch = useDispatch()

  // height of BurgerIngredients
  const burgerIngredientsRef = useRef(null)
  const burgerIngredientsScrollRef = useRef(null)

  const setBurgerIngredientsScrollHeight = () => {
    const height = getScrollBoxHeight(burgerIngredientsRef.current, 'burgerIngredientsScroll')
    burgerIngredientsScrollRef.current.style.height = height
  }

  useEffect(() => {
    setBurgerIngredientsScrollHeight()
    window.addEventListener('resize', setBurgerIngredientsScrollHeight)

    return () => {
      window.removeEventListener('resize', setBurgerIngredientsScrollHeight)
    }
  }, [])


  // categories
  const getCategory = useMemo(() => (type) => {
    const res = []
    ingredients.forEach((ingredient) => {
      if (ingredient.type === type) res.push(ingredient)
    })
    return res
  }, [ingredients])

  const bunsCategoryRef = useRef()
  const saucesCategoryRef = useRef()
  const toppingsCategoryRef = useRef()

  const categoriesList = useMemo(() => [
    {
      name: 'Булки',
      value: 'buns',
      data: getCategory('bun'),
      ref: bunsCategoryRef,
    },
    {
      name: 'Соусы',
      value: 'sauces',
      data: getCategory('sauce'),
      ref: saucesCategoryRef,
    },
    {
      name: 'Начинка',
      value: 'toppings',
      data: getCategory('main'),
      ref: toppingsCategoryRef,
    },
  ], [getCategory])


  // tabs
  const [currentTab, setCurrentTab] = useState('buns')

  const goToCategory = (categoryName) => {
    const relativeTop = window.scrollY > burgerIngredientsScrollRef.current.offsetTop
      ? window.scrollY
      : burgerIngredientsScrollRef.current.offsetTop
    const scrollTo = {}
    categoriesList.forEach((category) => {
      scrollTo[category.value] = () => {
        burgerIngredientsScrollRef.current.scrollTo({
          behavior: 'smooth',
          top: category.ref.current.offsetTop - relativeTop,
        })
      }
    })

    scrollTo[categoryName]()
  }

  const getCurrentCategory = useMemo(() => () => {
    burgerIngredientsScrollRef.current.addEventListener('scroll', () => {
      console.log('hi')
      const scrollDistance = burgerIngredientsScrollRef.current.scrollTop
      const heightOfOtherContent = getAbsoluteHeight(burgerIngredientsScrollRef.current)
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
  },[categoriesList])

  useEffect(() => {
    getCurrentCategory()
  },[getCurrentCategory])


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
