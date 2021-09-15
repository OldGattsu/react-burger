import { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { getIngredients } from '../store/actions/ingredients'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import BurgerIngredients from '../components/burger-ingredients/burger-ingredients'
import BurgerConstructor from '../components/burger-constructor/burger-constructor'
import Loader from '../components/loader/loader'

export default function Main() {
  const dispatch = useDispatch()
  const {
    ingredientsPending,
    ingredientsFulfilled,
    ingredientsRejected,
  } = useSelector(state => {
    return {
      ingredients: state.ingredients.data,
      ingredientsPending: state.ingredients.ingredientsPending,
      ingredientsFulfilled: state.ingredients.ingredientsFulfilled,
      ingredientsRejected: state.ingredients.ingredientsRejected,
    }
  })
  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch])

  return (
    <>
      {ingredientsPending && (<Loader noBlackout/>)}
      {ingredientsRejected && (<div>error</div>)}
      {ingredientsFulfilled && (
        <>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients/>
            <BurgerConstructor/>
          </DndProvider>
        </>
      )}
    </>
  );
}