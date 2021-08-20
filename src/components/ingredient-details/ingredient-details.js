import React from 'react'
import styles from './ingredient-details.module.css';

import Modal from '../modal/modal';
import ModalOverlay from '../modal-overlay/modal-overlay';


export default function IngredientDetails() {
  return (
    <ModalOverlay>
      <Modal title="Title">
        <div className={styles.ingredientDetails}>
          asdasdhgjghj
        </div>
      </Modal>
    </ModalOverlay>
  )
}