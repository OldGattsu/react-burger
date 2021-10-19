import propTypes from 'prop-types'
import styles from './menu.module.css'

import { FC } from 'react'

const Menu: FC = ({ children }) => {
  return (
    <nav className={styles.menu}>
      <ul className={styles.menuList}>{children}</ul>
    </nav>
  )
}
export default Menu