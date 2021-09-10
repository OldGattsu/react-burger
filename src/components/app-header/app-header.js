import clsx from 'clsx'
import styles from './app-header.module.css'

import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import Menu from '../menu/menu'
import MenuLink from '../menu-link/menu-link'

export default function AppHeader() {
  return (
    <header className={clsx(
      styles.appHeader,
      'mt-10',
    )}>
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
            name="Лента заказов"
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