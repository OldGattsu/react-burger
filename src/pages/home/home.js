import styles from './home.module.css'

import { useSelector } from 'react-redux'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { BurgerIngredients, BurgerConstructor, Loader } from '../../components'

export default function Main() {
  const { ingredientsPending, ingredientsFulfilled, ingredientsRejected } =
    useSelector((state) => {
      return {
        ingredientsPending: state.ingredients.ingredientsPending,
        ingredientsFulfilled: state.ingredients.ingredientsFulfilled,
        ingredientsRejected: state.ingredients.ingredientsRejected,
      }
    })

  return (
    <>
      {ingredientsPending && <Loader noBlackout />}
      {ingredientsRejected && <div>error</div>}
      {ingredientsFulfilled && (
        <>
          <DndProvider backend={HTML5Backend}>
            <div className={styles.homeContainer}>
              <BurgerIngredients />
              <BurgerConstructor />
            </div>
          </DndProvider>
        </>
      )}
    </>
  )
}
