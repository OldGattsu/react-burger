import React from 'react';
import propTypes from 'prop-types';
import clsx from 'clsx';
import styles from './menu-link.module.css';

export default function MenuLink ({name, icon, iconHover, first, last}) {
  const [isHover, setHover] = React.useState(false)

  const handleLinkMouseEnter = () => setHover(!isHover)
  const handleLinkMouseLeave = () => setHover(!isHover)

  return (
    <a
      className={clsx(
        styles.menuLink,
        !first && 'pl-4',
        !last && 'pr-4',
        'pt-4', 'pb-4',
        'text', 'text_type_main-default',
      )}
      href="/home"
      onMouseEnter={handleLinkMouseEnter}
      onMouseLeave={handleLinkMouseLeave}
    >
      <span className={clsx(
        styles.menuLinkIcon,
        'mr-2',
      )}>
        {isHover ? iconHover : icon}
      </span>
      <span className={styles.menuLinkName}>{name}</span>
    </a>
  )
}

MenuLink.propTypes = {
  name: propTypes.string,
  icon: propTypes.element,
  iconHover: propTypes.element,
  first: propTypes.bool,
  last: propTypes.bool,
}