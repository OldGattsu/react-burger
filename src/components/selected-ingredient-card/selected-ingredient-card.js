import { useRef } from 'react'
import styles from './selected-ingredient-card.module.css'

import { useDrag, useDrop } from 'react-dnd'

import { ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'

export default function SelectedIngredientCard({
  id,
  count,
  index,
  text,
  price,
  thumbnail,
  handleClose,
  handleSort
}) {
  const ref = useRef(null)
  const [{isDragging}, drag] = useDrag({
    type: 'selectedIngredient',
    item: { id , index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })

  const [, drop] = useDrop({
    accept: 'selectedIngredient',
    hover: (item, monitor) => {
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) return

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
      }

      handleSort(id, dragIndex, hoverIndex)

      item.index = hoverIndex;
    },
  })
  drag(drop(ref))
  const opacity = isDragging ? 0.3 : 1;
  return (
    <div className={styles.selectedIngredient} ref={ref} style={{opacity}}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={text}
        price={price}
        thumbnail={thumbnail}
        handleClose={() => handleClose(id, count)}
      />
    </div>
  )
}