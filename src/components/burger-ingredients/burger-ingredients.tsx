import { useState, useEffect, useRef, useMemo } from 'react'
import clsx from 'clsx'
import styles from './burger-ingredients.module.css'

import { useDispatch, useSelector } from '../../store/hooks'
import { setShownIngredient } from '../../store/actions/ingredient'

import { useHistory, useLocation } from 'react-router-dom'

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { IngredientsCategory } from '..'

import { getScrollBoxHeight } from '../../utils/methods'
import { IIngredient, TIngredients } from '../../types/ingredient'

export default function BurgerIngredients() {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()

  // get ingredients from store
  const ingredients = useSelector((state) => state.ingredients.data)
  const { selectedIngredients, selectedBun } = useSelector((state) => {
    return {
      selectedIngredients: state.burgerConstructor.selectedIngredients,
      selectedBun: state.burgerConstructor.selectedBun,
    }
  })

  // height of BurgerIngredients
  const burgerIngredientsRef = useRef<HTMLDivElement>(null)
  const burgerIngredientsScrollRef = useRef<HTMLDivElement>(null)

  const setBurgerIngredientsScrollHeight = () => {
    const height = getScrollBoxHeight(
      burgerIngredientsRef.current,
      'burgerIngredientsScroll'
    )
    if (burgerIngredientsScrollRef.current) {
      burgerIngredientsScrollRef.current.style.height = height
    }
  }

  useEffect(() => {
    setBurgerIngredientsScrollHeight()
    window.addEventListener('resize', setBurgerIngredientsScrollHeight)

    return () => {
      window.removeEventListener('resize', setBurgerIngredientsScrollHeight)
    }
  }, [])

  // categories
  const getCategory = useMemo(
    () => (type: string) => {
      const categoryIngredients: TIngredients = []
      ingredients.forEach((ingredient) => {
        if (ingredient.type === type) {
          const res = { ...ingredient }
          const count =
            ingredient.type !== 'bun'
              ? selectedIngredients.filter((selIngredient) => {
                  return selIngredient._id === ingredient._id
                }).length
              : selectedBun && selectedBun._id === ingredient._id
              ? 2
              : 0
          res.count = count
          categoryIngredients.push(res)
        }
      })
      return categoryIngredients
    },
    [ingredients, selectedIngredients, selectedBun]
  )

  const bunsCategoryRef = useRef()
  const saucesCategoryRef = useRef()
  const toppingsCategoryRef = useRef()

  const categoriesList = useMemo(
    () => [
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
    ],
    [getCategory]
  )

  // tabs
  const [currentTab, setCurrentTab] = useState('')

  const getCurrentCategory = useMemo(
    () => () => {
      const scrollDistance = burgerIngredientsScrollRef?.current?.scrollTop
      const heightOfOtherContent = burgerIngredientsScrollRef?.current?.offsetTop
      categoriesList.forEach((category) => {
        const categoryTopPosition =
        // @ts-ignore
          category.ref?.current?.offsetTop - heightOfOtherContent
        if (
          scrollDistance &&
          category.ref &&
          scrollDistance >= categoryTopPosition &&
          scrollDistance <=
          // @ts-ignore
            categoryTopPosition + category.ref.current.offsetHeight &&
          currentTab !== category.value
        ) {
          setCurrentTab(category.value)
        }
      })
    },
    [categoriesList, currentTab]
  )

  useEffect(() => {
    getCurrentCategory()
    burgerIngredientsScrollRef?.current?.addEventListener('scroll', () =>
      getCurrentCategory()
    )
  }, [getCurrentCategory])

  // ingredient details
  const showIngredientModal = (ingredient: IIngredient) => {
    dispatch(setShownIngredient(ingredient))
    history.push({
      pathname: `/ingredients/${ingredient._id}`,
      state: { background: location },
    })
  }

  return (
    <section className={styles.burgerIngredients} ref={burgerIngredientsRef}>
      <h1 className={clsx('text', 'text_type_main-large', 'pt-10')}>
        Соберите бургер
      </h1>
      <div className={clsx(styles.burgerIngredientsTabs, 'mt-5')}>
        {categoriesList.map((category, index) => (
          // @ts-ignore
          <Tab
            value={category.value}
            active={currentTab === category.value}
            key={index}
          >
            {category.name}
          </Tab>
        ))}
      </div>
      <div
        className={clsx(styles.burgerIngredientsScroll, 'mt-10')}
        ref={burgerIngredientsScrollRef}
      >
        {categoriesList.map((category, index) => (
          <IngredientsCategory
            name={category.name}
            data={category.data}
            // @ts-ignore
            ref={category.ref}
            key={index}
            onCardShow={showIngredientModal}
          />
        ))}
      </div>
    </section>
  )
}
