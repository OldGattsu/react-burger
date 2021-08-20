import React from 'react';
import clsx from 'clsx';
import styles from './modal.module.css';

export default function Modal({children, title}) {
	return (
		<div
			className={clsx(
				styles.modal,
				title ? styles.modalWithTitle : styles.modalWoTitle,
			)}>
			{children}
		</div>
	)
}