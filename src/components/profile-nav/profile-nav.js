import { useEffect } from 'react'
import styles from './profile-nav.module.css'

import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/actions/user'

import { useHistory, NavLink } from 'react-router-dom'

import Loader from '../loader/loader'

export default function ProfileNav() {
  const dispatch = useDispatch()
  const history = useHistory()

  const {
    logoutPending,
    logoutFulfilled,
  } = useSelector(state => {
    return {
      logoutPending: state.user.logoutPending,
      logoutFulfilled: state.user.logoutFulfilled,
    }
  })

  const onLogout = () => {
    dispatch(logout());
  }

  useEffect(() => {
    if (logoutFulfilled) history.replace('/login')
  }, [history, logoutFulfilled])

  if (logoutPending) return <Loader/>

  return (
    <ul className={styles.menu}>
      <li className={styles.menuLink}>
        <NavLink
          className={`${styles.link} text text_type_main-medium`}
          activeClassName={styles.linkActive}
          exact
          to="/profile"
        >
          Профиль
        </NavLink>
      </li>
      <li className={styles.menuLink}>
        <NavLink
          className={`${styles.link} text text_type_main-medium`}
          activeClassName={styles.linkActive}
          to="/profile/orders"
        >
          История заказов
        </NavLink>
      </li>
      <li className={styles.menuLink}>
        <p
          className={`${styles.link} text text_type_main-medium`}
          onClick={onLogout}
        >
          Выход
        </p>
      </li>
      <li className="mt-20">
        <p className="text text_type_main-default text_color_inactive">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </li>
    </ul>
  );
}