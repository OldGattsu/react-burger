import clsx from 'clsx'
import ReactDOM from 'react-dom'
import styles from './modal-overlay.module.css'

import { FC } from 'react'
import IModalOverlay from './modal-overlay.types'

const modalRoot = document.getElementById('react-modal')

const ModalOverlay: FC<IModalOverlay> = ({ children, onClose, noBlackout }) => {
  const handleClickOverlay = (e: { target: Element }) => {
    if (onClose && e.target.classList.contains(styles.modalOverlay)) {
      onClose()
    }
  }

  return ReactDOM.createPortal(
    <div
      className={clsx(
        styles.modalOverlay,
        noBlackout && styles.modalOverlayNoBlackout
      )}
      // @ts-ignore
      onClick={handleClickOverlay}
    >
      {children}
    </div>,
    // @ts-ignore
    modalRoot
  )
}

export default ModalOverlay