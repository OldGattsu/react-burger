import { useEffect, FC, FormEvent } from 'react'
import clsx from 'clsx'
import styles from '../../components/user-form/user-form.module.css'

import { useDispatch, useSelector } from '../../store/hooks'
import { registration } from '../../store/actions/user'

import { Link, Redirect, useHistory } from 'react-router-dom'

import useForm from '../../hooks/useForm'

import {
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'

import { UserFormContainer, UserForm, Loader } from '../../components'

const Registration: FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const { formValues, onChangeForm, resetForm } = useForm()

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    dispatch(registration(formValues))
    resetForm()
  }

  const {
    isLoggedIn,
    isUserLoaded,
    registrationPending,
    registrationFulfilled,
  } = useSelector((state) => {
    return {
      isLoggedIn: state.user.isLoggedIn,
      isUserLoaded: state.user.isUserLoaded,
      registrationPending: state.user.registrationPending,
      registrationFulfilled: state.user.registrationFulfilled,
    }
  })

  useEffect(() => {
    if (registrationFulfilled) history.push('/profile')
  }, [history, registrationFulfilled])

  if (!isUserLoaded) return null

  if (isLoggedIn) return <Redirect to='/' />

  if (registrationPending) return <Loader />

  return (
    <UserFormContainer title='Регистрация'>
      <UserForm buttonsName='Зарегистрироваться' onSubmit={onSubmit}>
        <>
          <div className={clsx(styles.userFormInput, 'mt-6')}>
            <Input
              onChange={onChangeForm}
              value={formValues.name || ''}
              name='name'
              type='text'
              placeholder='Имя'
            />
          </div>
          <div className={clsx(styles.userFormInput, 'mt-6')}>
            <Input
              onChange={onChangeForm}
              value={formValues.email || ''}
              name='email'
              type='email'
              placeholder='E-mail'
            />
          </div>
          <div className={clsx(styles.userFormInput, 'mt-6')}>
            <PasswordInput
              onChange={onChangeForm}
              value={formValues.password || ''}
              name='password'
            />
          </div>
        </>
      </UserForm>
      <p className={clsx('text', 'text_type_main-default', 'mb-4')}>
        Уже зарегистрированы?&nbsp;
        <Link className={styles.userFormLink} to='/login'>
          Войти
        </Link>
      </p>
    </UserFormContainer>
  )
}

export default Registration