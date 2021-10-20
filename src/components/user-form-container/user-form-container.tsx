import clsx from 'clsx'
import { FC } from 'react'
import { IUserFormContainer } from './user-form-container.types'
import styles from './user-form-container.module.css'

const UserFormContainer: FC<IUserFormContainer> = ({ children, title }) => {
  return (
    <section className={styles.section}>
      <h1 className={clsx('text', 'text_type_main-medium')}>{title}</h1>
      {children}
    </section>
  )
}

export default UserFormContainer
