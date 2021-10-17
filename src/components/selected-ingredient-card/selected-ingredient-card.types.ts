export default interface ISelectedIngredientCard {
  id: string
  subId: string
  index: number
  text: string
  price: number
  thumbnail: string
  handleClose: (id: string, subId: string) => void
  handleSort: (id: string, dragIndex: number, hoverIndex: number) => void
}