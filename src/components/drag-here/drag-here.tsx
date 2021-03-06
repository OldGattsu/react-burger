import clsx from 'clsx'
import styles from './drag-here.module.css'
import dragHereImg from '../../images/drag-here.svg'

import { FC } from 'react'

const DragHere: FC<{ dragging: boolean }> = ({ dragging }) => {
  return (
    <div className={clsx(styles.dragHere)}>
      <div className={clsx(dragging && styles.dragHereHover)}>
        <p
          className={clsx(
            styles.dragHereText,
            'mb-10',
            'text',
            'text_type_main-large'
          )}
        >
          Cюда
        </p>
        <img className={styles.dragHereImg} src={dragHereImg} alt='drag-here' />
      </div>
    </div>
  )
}
export default DragHere