import clsx from 'clsx'
import styles from './drag-here.module.css'
import dragHereImg from '../../images/drag-here.svg'

export default function DragHere() {
  return (
    <div className={styles.dragHere}>
      <p className={clsx(
        styles.dragHereText,
        'mb-10',
        'text', 'text_type_main-large',
      )}>Cюда</p>
      <img
        className={styles.dragHereImg}
        src={dragHereImg}
        alt='drag-here'/>
    </div>
  )
}