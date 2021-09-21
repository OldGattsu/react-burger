import clsx from 'clsx'
import styles from './profile-nav.module.css'

import { useDispatch } from 'react-redux'
import { logout } from '../../store/actions/user'

import { NavLink } from 'react-router-dom'

export default function ProfileNav() {
  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch(logout())
  }

  return (
    <nav className={styles.nav}>
      <ul className={styles.menu}>
        <li className={styles.menuLink}>
          <NavLink
            className={clsx(styles.link, 'text', 'text text_type_main-medium')}
            activeClassName={styles.linkActive}
            exact
            to='/profile'
          >
            Профиль
          </NavLink>
        </li>
        <li className={styles.menuLink}>
          <NavLink
            className={clsx(styles.link, 'text', 'text text_type_main-medium')}
            activeClassName={styles.linkActive}
            to='/profile/orders'
          >
            История заказов
          </NavLink>
        </li>
        <li className={styles.menuLink}>
          <p
            className={clsx(styles.link, 'text', 'text text_type_main-medium')}
            onClick={onLogout}
          >
            Выход
          </p>
        </li>
      </ul>
      <p
        className={clsx(
          'mt-20',
          'text',
          'text_type_main-default',
          'text_color_inactive'
        )}
      >
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </nav>
  )
}
