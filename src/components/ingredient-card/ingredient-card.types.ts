export default interface IIngredientCard {
  id: string
  count: number
  img: string
  price: number
  name: string
  onShow: () => void
}