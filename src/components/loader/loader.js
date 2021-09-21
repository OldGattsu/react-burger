import propTypes from 'prop-types'
import styles from './loader.module.css'

import { ModalOverlay } from '..'
import LoaderSpinner from 'react-loader-spinner'

export default function Loader({ noBlackout }) {
  return (
    <ModalOverlay noBlackout={noBlackout}>
      <LoaderSpinner
        className={styles.loader}
        type='Puff'
        color='#8585AD'
        height={70}
        width={70}
      />
    </ModalOverlay>
  )
}

Loader.propTypes = {
  noBlackout: propTypes.bool,
}
