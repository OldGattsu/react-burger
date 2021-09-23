import clsx from 'clsx'
import propTypes from 'prop-types'
import styles from './user-form.module.css'

import { Button } from '@ya.praktikum/react-developer-burger-ui-components'

export default function UserForm({
  children,
  buttonsName,
  onSubmit,
  onReset,
  className,
}) {
  return (
    <form className={clsx(styles.userForm, className)} onSubmit={onSubmit}>
      <fieldset className={styles.userFormFieldset}>{children}</fieldset>
      <div className={clsx('mt-6', 'mb-20')}>
        {buttonsName && Array.isArray(buttonsName) ? (
          <div className={styles.userFormButtons}>
            <Button type='secondary' size='medium' onClick={onReset}>
              {buttonsName[0]}
            </Button>
            <Button type='primary' size='medium'>
              {buttonsName[1]}
            </Button>
          </div>
        ) : (
          <Button type='primary' size='medium'>
            {buttonsName}
          </Button>
        )}
      </div>
    </form>
  )
}

UserForm.propTypes = {
  children: propTypes.node.isRequired,
  buttonsName: propTypes.oneOfType([propTypes.string, propTypes.array])
    .isRequired,
  onSubmit: propTypes.func.isRequired,
  onReset: propTypes.func,
  className: propTypes.string,
}
