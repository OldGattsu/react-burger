import { useRef } from 'react'
import styles from './selected-ingredient-card.module.css'

import { useDrag, useDrop } from 'react-dnd'

import { FC } from 'react'
import ISelectedIngredientCard from './selected-ingredient-card.types'
import { IIngredient } from '../../types/ingredient'

import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

const SelectedIngredientCard: FC<ISelectedIngredientCard> = ({
  id,
  subId,
  index,
  text,
  price,
  thumbnail,
  handleClose,
  handleSort,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [{ isDragging }, drag] = useDrag({
    type: 'selectedIngredient',
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop({
    accept: 'selectedIngredient',
    hover: (item: IIngredient, monitor) => {
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) return

      // @ts-ignore
      const hoverBoundingRect: DOMRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset?.y ? clientOffset.y - hoverBoundingRect.top : 0

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      handleSort(id, dragIndex, hoverIndex)

      item.index = hoverIndex
    },
  })
  drag(drop(ref))
  const opacity = isDragging ? 0.3 : 1
  return (
    <div className={styles.selectedIngredient} ref={ref} style={{ opacity }}>
      <DragIcon type='primary' />
      <ConstructorElement
        text={text}
        price={price}
        thumbnail={thumbnail}
        handleClose={() => handleClose(id, subId)}
      />
    </div>
  )
}

export default SelectedIngredientCard
