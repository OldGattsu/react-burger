import React from 'react'
import styles from './ingredient-details.module.css';

import Modal from '../modal/modal';
import ModalOverlay from '../modal-overlay/modal-overlay';


export default function IngredientDetails(
  {image, name, calories, proteins, fat, carbohydrates}) {

  const EnergyItem = ({name, value}) => {
    return (
      <div className={styles.EnergyItem}>
        <span></span>
      </div>
    )
  }

  return (
    <ModalOverlay>
      <Modal title="Детали ингредиента">
        <div className={styles.ingredientDetails}>
          <img className={styles.ingredientImage} src={image} alt={name} />
          <p className={clsx(
            styles.ingredientName,
            'text', 'text_type_main-medium',
          )}>{name}</p>
          <div className={styles.ingredientEnergy}>
          </div>
        </div>
      </Modal>
    </ModalOverlay>
  )
}