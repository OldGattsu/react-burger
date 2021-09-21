import clsx from 'clsx'
import styles from './profile-nav.module.css'

import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/actions/user'

import { NavLink } from 'react-router-dom'

import Loader from '../loader/loader'

export default function ProfileNav() {
  const dispatch = useDispatch()

  const { logoutPending } = useSelector((state) => {
    return {
      logoutPending: state.user.logoutPending,
    }
  })

  const onLogout = () => {
    dispatch(logout())
  }

  if (logoutPending) return <Loader />

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
