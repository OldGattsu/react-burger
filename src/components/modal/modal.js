import React from 'react';
import clsx from 'clsx';
import styles from './modal.module.css';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

export default function Modal({children, title}) {
	return (
		<div className={clsx(
			styles.modal,
			title ? styles.modalWithTitle : styles.modalWoTitle,
			title && 'pt-10'
		)}>
			<p className={clsx(
				styles.modalTitle,
				'text', 'text_type_main-large',
				'pl-10', 'pr-10',
			)}>
				<span className={styles.modalTitleText}>{title}</span>
				<button className={styles.modalTitleIcon}><CloseIcon type="primary" /></button>
			</p>
			<div className={styles.modalContent}>{children}</div>
		</div>
	)
}