export interface IIngredient {
  _id: string
  id?: string
  index: number
  subId?: string,
  key?: string
  name: string
  type: string
  price: number
  image: string
  image_large: string
  image_mobile: string
  calories: number
  proteins: number
  fat: number
  carbohydrates: number
}

export type TIngredients = IIngredient[]
