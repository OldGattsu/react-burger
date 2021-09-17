import styles from "./profile-nav.module.css";

import { useDispatch } from "react-redux"
import { logout } from "../../store/actions/user";

import { NavLink } from "react-router-dom";

export default function ProfileNav() {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
  };

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