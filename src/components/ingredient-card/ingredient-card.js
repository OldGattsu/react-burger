import propTypes from 'prop-types'
import clsx from 'clsx'
import styles from './ingredient-card.module.css'

import { useDrag } from 'react-dnd'

import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

export default function IngredientCard({id, img, price, name, count, onShow}) {
  const [{ opacity }, ref] = useDrag({
    type: 'ingredient',
    item: { id },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });
  return (
    <div
      className={styles.ingredientCard}
      ref={ref}
      style={{opacity}}
      onClick={onShow}
    >
      <img className={styles.ingredientCardImage} src={img} alt={name} />
      <p className={clsx(
        styles.ingredientCardPrice,
        'text', 'text_type_digits-default',
        'pt-1', 'pb-1',
      )}>
        <span className="mr-2">{price}</span>
        <CurrencyIcon type="primary" />
      </p>
      <p className={clsx(
        styles.ingredientCardName,
        'text', 'text_type_main-default',
        'pt-1',
      )}>{name}</p>
      <Counter count={count} size="default" />
    </div>
  )
}

IngredientCard.propTypes = {
  img: propTypes.string.isRequired,
  price: propTypes.number.isRequired,
  name: propTypes.string.isRequired,
  onShow: propTypes.func.isRequired,
}