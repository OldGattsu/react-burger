import React from 'react';
import styles from './app-header.module.css';

import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

export default function AppHeader() {
  const Menu = ({ children }) => {
    return (
      <nav className={styles.menu}>
        <ul className={styles.menuList}>
          { children }
        </ul>
      </nav>
    )
  }

  // возможно стоит вынести MenuLink выше, на один уровень с AppHeader в этом же файле или создать новый файл для него
  const MenuLink = ({ name, icon, iconHover }) => {
    const [isHover, setHover] = React.useState(false)

    const handleLinkMouseEnter = () => {
      setHover(!isHover)
    }

    const handleLinkMouseLeave = () => {
      setHover(!isHover)
    }

    return (
      <a
        className={styles.menuLink}
        href="/home"
        onMouseEnter={handleLinkMouseEnter}
        onMouseLeave={handleLinkMouseLeave}
      >
        <span className={styles.menuLinkIcon}>
          {isHover ? iconHover : icon}
        </span>
        <span className={styles.menuLinkName}>{name}</span>
      </a>
    )
  }

  return (
    <header className={styles.appHeader}>
      <Menu>
        <li>
          <MenuLink
            name="Конструктор"
            icon={<BurgerIcon type="primary"/>}
            iconHover={<BurgerIcon type="secondary"/>}
          />
        </li>
        <li>
          <MenuLink
            name="Конструктор"
            icon={<ListIcon type="primary"/>}
            iconHover={<ListIcon type="secondary"/>}
          />
        </li>
      </Menu>
      <div className={styles.logo}><Logo/></div>
      <MenuLink
        name="Личный кабинет"
        icon={<ProfileIcon type="primary" />}
        iconHover={<ProfileIcon type="secondary"/>}
      />
    </header>
  )
}