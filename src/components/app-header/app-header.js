import React from 'react';
import clsx from 'clsx';
import styles from './app-header.module.css';

import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

export default function AppHeader() {
  const Menu = ({children}) => {
    return (
      <nav className={styles.menu}>
        <ul className={styles.menuList}>
          {children}
        </ul>
      </nav>
    )
  }

  const MenuLink = ({name, icon, iconHover, first, last}) => {
    const [isHover, setHover] = React.useState(false)

    const handleLinkMouseEnter = () => setHover(!isHover)
    const handleLinkMouseLeave = () => setHover(!isHover)

    return (
      <a
        className={clsx(
          styles.menuLink,
          first && styles.menuLinkFirst,
          last && styles.menuLinkLast,
        )}
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
            first
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
      <a className={styles.logo} href="/home"><Logo/></a>
      <MenuLink
        name="Личный кабинет"
        icon={<ProfileIcon type="primary" />}
        iconHover={<ProfileIcon type="secondary"/>}
        last
      />
    </header>
  )
}