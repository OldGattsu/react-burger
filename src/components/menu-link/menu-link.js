import { useState } from 'react'
import propTypes from 'prop-types'
import clsx from 'clsx'
import styles from './menu-link.module.css'

import { useLocation, NavLink } from 'react-router-dom'

export default function MenuLink ({name, to, icon, iconHover, first, last}) {
  const { pathname } = useLocation()
  const [isHover, setHover] = useState(false)

  const handleLinkMouseEnter = () => setHover(!isHover)
  const handleLinkMouseLeave = () => setHover(!isHover)

  return (
    <NavLink
      className={clsx(
        styles.menuLink,
        !first && 'pl-4',
        !last && 'pr-4',
        'pt-4', 'pb-4',
        'text', 'text_type_main-default',
      )}
      activeClassName={styles.menuLinkActive}
      to={to}
      exact
      onMouseEnter={handleLinkMouseEnter}
      onMouseLeave={handleLinkMouseLeave}
    >
      <span className={clsx(
        styles.menuLinkIcon,
        'mr-2',
      )}>
        {isHover || pathname === to ? iconHover : icon}
      </span>
      <span className={styles.menuLinkName}>{name}</span>
    </NavLink>
  )
}

MenuLink.propTypes = {
  name: propTypes.string.isRequired,
  to: propTypes.string.isRequired,
  icon: propTypes.element.isRequired,
  iconHover: propTypes.element.isRequired,
  first: propTypes.bool,
  last: propTypes.bool,
}