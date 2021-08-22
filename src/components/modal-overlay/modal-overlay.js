import propTypes from 'prop-types';
import ReactDOM from 'react-dom';
import styles from './modal-overlay.module.css';

const modalRoot = document.getElementById("react-modal");

export default function ModalOverlay({children}) {
	return ReactDOM.createPortal(
		(
			<div className={styles.modalOverlay}>
				{children}
			</div>
		)
	, modalRoot)
}

ModalOverlay.propTypes = {
	children: propTypes.node,
}