import { useRef, useEffect } from 'react'
import propTypes from 'prop-types'
import clsx from 'clsx'
import styles from './modal.module.css'

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ModalOverlay } from '..'

export default function Modal({ children, title, onClose }) {
  const modalRef = useRef(null)

  const handleEscClose = (e) => {
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

Modal.propTypes = {
  children: propTypes.node.isRequired,
  title: propTypes.string,
  onClose: propTypes.func.isRequired,
}
