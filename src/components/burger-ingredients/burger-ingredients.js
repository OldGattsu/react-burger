import { useState, useEffect, useRef, useMemo } from 'react'
import clsx from 'clsx'
import styles from './burger-ingredients.module.css'

import { useDispatch, useSelector } from 'react-redux'
import {
  setShownIngredient,
  unsetShownIngredient,
} from '../../store/actions/ingredient'

import { useHistory, useLocation } from 'react-router-dom'

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../modal/modal';
import IngredientsCategory from '../ingredients-category/ingredients-category'
import IngredientDetails from '../ingredient-details/ingredient-details'

import { getScrollBoxHeight } from '../../utils/methods'

export default function BurgerIngredients() {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()

  // get ingredients from store
  const ingredients = useSelector(state => state.ingredients.data)
  const {
    selectedIngredients,
    selectedBun
  } = useSelector(state => {
    return {
      selectedIngredients: state.burgerConstructor.selectedIngredients,
      selectedBun: state.burgerConstructor.selectedBun,
    }
  })

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
    const categoryIngredients = []
    ingredients.forEach((ingredient) => {
      if (ingredient.type === type) {
        const res = {...ingredient}
        const count = ingredient.type !== 'bun'
          ? (selectedIngredients.filter((selIngredient) => {
            return selIngredient._id === ingredient._id
          }).length)
          : (selectedBun && selectedBun._id === ingredient._id)
          ? 2 : 0
        res.count = count
        categoryIngredients.push(res)
      }
    })
    return categoryIngredients
  }, [ingredients, selectedIngredients, selectedBun])

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
  const [currentTab, setCurrentTab] = useState('')

  const getCurrentCategory = useMemo(() => () => {
    const scrollDistance = burgerIngredientsScrollRef.current.scrollTop
    const heightOfOtherContent = burgerIngredientsScrollRef.current.offsetTop
    categoriesList.forEach((category) => {
      const categoryTopPosition = category.ref.current.offsetTop - heightOfOtherContent
      if (
        scrollDistance >= categoryTopPosition
        && scrollDistance <= categoryTopPosition + category.ref.current.offsetHeight
        && currentTab !== category.value
      ) {
        setCurrentTab(category.value)
      }
    })
  },[categoriesList, currentTab])

  useEffect(() => {
    getCurrentCategory()
    burgerIngredientsScrollRef.current.addEventListener('scroll', () => getCurrentCategory())
  },[getCurrentCategory])


  // ingredient details
  const shownIngredient = useSelector(state => state.ingredient.data)

  const showIngredientModal = (ingredient) => {
    console.log('halo')
    dispatch(setShownIngredient(ingredient))
    history.push({
      pathname: `/ingredients/${ingredient._id}`,
      state: { background: location }
    })
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
      {/* {Object.keys(shownIngredient).length > 0 && (
        <Modal
          title="Детали ингредиента"
          onClose={closeIngredientModal}
        >
          <IngredientDetails
            name={shownIngredient.name}
            imageLarge={shownIngredient.image_large}
            calories={shownIngredient.calories}
            proteins={shownIngredient.proteins}
            fat={shownIngredient.fat}
            carbohydrates={shownIngredient.carbohydrates}
          />
        </Modal>
      )} */}
    </>
  )
}
