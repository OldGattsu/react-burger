import clsx from 'clsx'
import { FC } from 'react'
import { IUserForm } from './user-form.types'
import styles from './user-form.module.css'

import { Button } from '@ya.praktikum/react-developer-burger-ui-components'

const UserForm: FC<IUserForm> = ({
  children,
  buttonsName,
  onSubmit,
  onReset,
  className,
}) => {
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

export default UserForm