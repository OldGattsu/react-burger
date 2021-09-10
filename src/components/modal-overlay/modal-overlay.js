import clsx from 'clsx'
import propTypes from 'prop-types'
import ReactDOM from 'react-dom'
import styles from './modal-overlay.module.css'

const modalRoot = document.getElementById("react-modal")

export default function ModalOverlay({children, onClose, noBlackout}) {
	const handleClickOverlay = (e) => {
		if (onClose && e.target.classList.contains(styles.modalOverlay)) {
			onClose()
		}
	}

	return ReactDOM.createPortal(
		(
			<div
				className={clsx(
					styles.modalOverlay,
					noBlackout && styles.modalOverlayNoBlackout,
				)}
				onClick={handleClickOverlay}
			>
				{children}
			</div>
		)
	, modalRoot)
}

ModalOverlay.propTypes = {
	children: propTypes.node.isRequired,
	onClose: propTypes.func,
  noBlackout: propTypes.bool,
}