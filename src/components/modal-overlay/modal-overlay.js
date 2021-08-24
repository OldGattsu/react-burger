import React from 'react';
import propTypes from 'prop-types';
import ReactDOM from 'react-dom';
import styles from './modal-overlay.module.css';

const modalRoot = document.getElementById("react-modal");

export default function ModalOverlay({children, onClose}) {
	const handleClickOverlay = (e) => {
		if (e.target.classList.contains(styles.modalOverlay)) {
			onClose()
		}
	}

	return ReactDOM.createPortal(
		(
			<div className={styles.modalOverlay} onClick={handleClickOverlay}>
				{children}
			</div>
		)
	, modalRoot)
}

ModalOverlay.propTypes = {
	children: propTypes.node.isRequired,
	onClose: propTypes.func.isRequired,
}