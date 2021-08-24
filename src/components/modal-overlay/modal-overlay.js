import React from 'react';
import propTypes from 'prop-types';
import ReactDOM from 'react-dom';
import styles from './modal-overlay.module.css';

const modalRoot = document.getElementById("react-modal");

export default function ModalOverlay({children, onClose}) {
	const overlayRef = React.useRef(null)

	const handleClickOverlay = (e) => {
		if (overlayRef.current && e.target.isEqualNode(overlayRef.current)) {
			onClose()
		}
	}

	React.useEffect(() => {
		document.addEventListener('click', handleClickOverlay)

		return () => {
			document.removeEventListener('click', handleClickOverlay)
		}
	})

	return ReactDOM.createPortal(
		(
			<div className={styles.modalOverlay} ref={overlayRef}>
				{children}
			</div>
		)
	, modalRoot)
}

ModalOverlay.propTypes = {
	children: propTypes.node.isRequired,
	onClose: propTypes.func.isRequired,
}