import clsx from 'clsx'
import styles from './ingredient-details.module.css'

import { FC } from 'react'
import { IEnergyItem, IIngredientDetails } from './ingredient-details.types'

const IngredientDetails: FC<IIngredientDetails> = ({
  name,
  imageLarge,
  calories,
  proteins,
  fat,
  carbohydrates,
}) => {
  const energyList = [
    {
      name: 'Калории,ккал',
      value: calories,
    },
    {
      name: 'Белки,г',
      value: proteins,
    },
    {
      name: 'Жиры,г',
      value: fat,
    },
    {
      name: 'Углеводы,г',
      value: carbohydrates,
    },
  ]

  const EnergyItem: FC<IEnergyItem> = ({ name, value }) => {
    return (
      <div className={styles.energyItem}>
        <span
          className={clsx(
            styles.energyName,
            'text',
            'text_type_main-default',
            'text_color_inactive',
            'mb-2'
          )}
        >
          {name}
        </span>
        <span
          className={clsx(
            styles.energyItem,
            'text',
            'text_type_digits-default',
            'text_color_inactive'
          )}
        >
          {value}
        </span>
      </div>
    )
  }

  return (
    <div className={styles.ingredientDetails}>
      <img
        className={clsx(styles.ingredientImage, 'mb-4')}
        src={imageLarge}
        alt={name}
      />
      <p
        className={clsx(
          styles.ingredientName,
          'text',
          'text_type_main-medium',
          'mb-8'
        )}
      >
        {name}
      </p>
      <div className={styles.ingredientEnergy}>
        {energyList.map((energy, index) => (
          <EnergyItem name={energy.name} value={energy.value} key={index} />
        ))}
      </div>
    </div>
  )
}

export default IngredientDetails