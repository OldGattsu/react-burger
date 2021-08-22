import propTypes from 'prop-types';
import clsx from 'clsx';
import styles from './ingredient-card.module.css';

import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export default function IngredientCard({img, price, name, onShow}) {
  return (
    <div
      className={styles.ingredientCard}
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
      <Counter count={1} size="default" />
    </div>
  )
}

IngredientCard.propTypes = {
  img: propTypes.string,
  price: propTypes.number,
  name: propTypes.string,
  onShow: propTypes.func,
}