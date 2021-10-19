import clsx from 'clsx'
import styles from './app-header.module.css'

import { NavLink } from 'react-router-dom'
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Menu, MenuLink } from '..'

import { FC } from 'react'

const AppHeader: FC = () => {
  return (
    <header className={clsx(styles.appHeader, 'pt-6', 'pb-4')}>
      <div className={styles.appHeaderContainer}>
        <Menu>
          <li>
            <MenuLink
              name='Конструктор'
              to='/'
              icon={<BurgerIcon type='primary' />}
              iconHover={<BurgerIcon type='secondary' />}
              first
            />
          </li>
          <li>
            <MenuLink
              name='Лента заказов'
              to='/feed'
              icon={<ListIcon type='primary' />}
              iconHover={<ListIcon type='secondary' />}
            />
          </li>
        </Menu>
        <NavLink className={styles.logo} to='/'>
          <Logo />
        </NavLink>
        <MenuLink
          name='Личный кабинет'
          to='/profile'
          icon={<ProfileIcon type='primary' />}
          iconHover={<ProfileIcon type='secondary' />}
          last
        />
      </div>
    </header>
  )
}

export default AppHeader