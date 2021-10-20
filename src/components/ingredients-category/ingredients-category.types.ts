import { TIngredients, IIngredient } from "../../types/ingredient";

export default interface IIngredientsCategory {
  name: string
  data: TIngredients
  onCardShow: (ingredient: IIngredient) => void
}