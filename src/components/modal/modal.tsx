import { useRef, useEffect, FC } from 'react'
import clsx from 'clsx'
import styles from './modal.module.css'

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ModalOverlay } from '..'

import IModal from './modal.types'

const Modal: FC<IModal> = ({ children, title, onClose }) => {
  const modalRef = useRef(null)

  const handleEscClose = (e: KeyboardEvent): void => {
    if (e.keyCode === 27) onClose()
  }

  useEffect(() => {
    document.addEventListener('keydown', handleEscClose)

    return () => {
      document.removeEventListener('keydown', handleEscClose)
    }
  })

  if (!children) return null

  return (
    <ModalOverlay onClose={onClose}>
      <div
        className={clsx(styles.modal, title ? 'pt-10 pb-15' : 'pt-30 pb-30')}
        ref={modalRef}
      >
        {!title && (
          <button className={styles.modalCloseIcon} onClick={onClose}>
            <CloseIcon type='primary' />
          </button>
        )}
        {title && (
          <p
            className={clsx(
              styles.modalTitle,
              'text',
              'text_type_main-large',
              'pl-10',
              'pr-10'
            )}
          >
            <span className={styles.modalTitleText}>{title}</span>
            <button className={styles.modalTitleIcon} onClick={onClose}>
              <CloseIcon type='primary' />
            </button>
          </p>
        )}
        <div className={styles.modalContent}>{children}</div>
      </div>
    </ModalOverlay>
  )
}

export default Modal