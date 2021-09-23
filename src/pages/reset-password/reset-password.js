import { useEffect } from 'react'
import clsx from 'clsx'
import styles from '../../components/user-form/user-form.module.css'

import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../../store/actions/user'

import { Link, Redirect, useHistory } from 'react-router-dom'

import {
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { UserFormContainer, UserForm, Loader } from '../../components'

import useForm from '../../hooks/useForm'

export default function ResetPassword() {
  const dispatch = useDispatch()
  const history = useHistory()

  const { formValues, onChangeForm, resetForm } = useForm()

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(resetPassword(formValues))
    resetForm()
  }

  const {
    isLoggedIn,
    forgotPasswordFulfilled,
    resetPasswordPending,
    resetPasswordFulfilled,
  } = useSelector((state) => {
    return {
      isLoggedIn: state.user.isLoggedIn,
      forgotPasswordFulfilled: state.user.forgotPasswordFulfilled,
      resetPasswordPending: state.user.resetPasswordPending,
      resetPasswordFulfilled: state.user.resetPasswordFulfilled,
    }
  })

  useEffect(() => {
    if (!forgotPasswordFulfilled || resetPasswordFulfilled)
      history.replace('/login')
  }, [history, resetPasswordFulfilled, forgotPasswordFulfilled])

  if (isLoggedIn) return <Redirect to='/' />

  if (resetPasswordPending) return <Loader />

  return (
    <UserFormContainer title='Восстановление пароля'>
      <UserForm buttonsName='Сохранить' onSubmit={onSubmit}>
        <div className={clsx(styles.userFormInput, 'mt-6')}>
          <PasswordInput
            onChange={onChangeForm}
            value={formValues.password || ''}
            name='password'
            placeholder='Введите новый пароль'
          />
        </div>
        <div className={clsx(styles.userFormInput, 'mt-6')}>
          <Input
            onChange={onChangeForm}
            value={formValues.token || ''}
            name='token'
            type='text'
            placeholder='Введите код из письма'
          />
        </div>
      </UserForm>
      <p className={clsx('text', 'text_type_main-default', 'mb-4')}>
        Вспомнили пароль?&nbsp;
        <Link className={styles.userFormLink} to='/login'>
          Войти
        </Link>
      </p>
    </UserFormContainer>
  )
}
