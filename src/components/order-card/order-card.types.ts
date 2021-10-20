import { IOrder } from '../../store/types/order'

export interface IOrderCard {
  order: IOrder
  fromFeed?: boolean
}
