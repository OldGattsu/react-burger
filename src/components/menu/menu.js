import propTypes from 'prop-types';
import styles from './menu.module.css';

export default function Menu ({children}) {
  return (
    <nav className={styles.menu}>
      <ul className={styles.menuList}>
        {children}
      </ul>
    </nav>
  )
}

Menu.propTypes = {
  children: propTypes.node.isRequired,
}