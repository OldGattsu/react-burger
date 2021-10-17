import styles from './loader.module.css'

import { ModalOverlay } from '..'
import LoaderSpinner from 'react-loader-spinner'

import { FC } from 'react'

const Loader: FC<{ noBlackout: boolean }> = ({ noBlackout }) => {
  return (
    <ModalOverlay noBlackout={noBlackout}>
      <div className={styles.loader}>
        <LoaderSpinner type='Puff' color='#8585AD' height={70} width={70} />
      </div>
    </ModalOverlay>
  )
}

export default Loader
