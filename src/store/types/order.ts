import { TIngredients } from '../../types/ingredient'

export interface IOrder {
  _id: string
  createdAt: string
  name: string
  number: number
  price: number
  status?: string
  ingredients: TIngredients
}

export interface IRawOrder {
  _id: string
  createdAt: string
  name: string
  number: number
  price: number
  status?: string
  ingredients: string[]
}

export interface IOrders {
  orders: IOrder[]
  total: number
  totalToday: number
}

export interface IRawOrders {
  orders: IRawOrder[]
  total: number
  totalToday: number
}
