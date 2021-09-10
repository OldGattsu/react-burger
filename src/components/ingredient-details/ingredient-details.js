import propTypes from 'prop-types'
import clsx from 'clsx'
import styles from './ingredient-details.module.css'

export default function IngredientDetails({data}) {
  const EnergyItem = ({name, value}) => {
    return (
      <div className={styles.energyItem}>
        <span className={clsx(
          styles.energyName,
          'text', 'text_type_main-default', 'text_color_inactive',
          'mb-2',
        )}>{name}</span>
        <span className={clsx(
          styles.energyItem,
          'text', 'text_type_digits-default', 'text_color_inactive',
        )}>{value}</span>
      </div>
    )
  }

  const energyList = [
    {
      name: 'Калории,ккал',
      value: data.calories,
    },
    {
      name: 'Белки,г',
      value: data.proteins,
    },
    {
      name: 'Жиры,г',
      value: data.fat,
    },
    {
      name: 'Углеводы,г',
      value: data.carbohydrates,
    },
  ]

  if (data.length < 0) return null

  return (
    <div className={styles.ingredientDetails}>
      <img
        className={clsx(
          styles.ingredientImage,
          'mb-4',
        )}
        src={data.image_large}
        alt={data.name}
      />
      <p className={clsx(
        styles.ingredientName,
        'text', 'text_type_main-medium',
        'mb-8',
      )}>{data.name}</p>
      <div className={styles.ingredientEnergy}>
        {energyList.map((energy, index) => (
          <EnergyItem
            name={energy.name}
            value={energy.value}
            key={index}
          />
        ))}
      </div>
    </div>
  )
}

IngredientDetails.propTypes = {
  data: propTypes.shape({
    image_large: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    calories: propTypes.number.isRequired,
    proteins: propTypes.number.isRequired,
    fat: propTypes.number.isRequired,
    carbohydrates: propTypes.number.isRequired,
  }).isRequired,
}