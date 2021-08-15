import React from 'react';
import styles from './app-header.module.css';

import { Logo, BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'

export default function AppHeader() {

  const obj = {
    'burger' : BurgerIcon,
  }

  const MenuLink = ({ name, icon }) => {
    return (
      <a className={styles.menuLink} href="#">
        <span className={styles.menuLinkIcon}>{icon}</span>
        <span className={styles.menuLinkName}>{name}</span>
      </a>
    )
  }

  return (
    <header className={styles.app_header}>
      <MenuLink name="Конструктор" icon={<BurgerIcon type="primary" />} />
      <Logo />
      <h1>Helasdlo!</h1>
      <h2>dsfdsf</h2>
      <h2>dsfdsf</h2>
      <h1>Helasdlo!</h1>
    </header>
  )
}