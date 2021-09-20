import { useEffect } from 'react'
import clsx from 'clsx'
import styles from '../../components/user-form/user-form.module.css'

import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword } from '../../store/actions/user'

import { Link, Redirect, useHistory } from 'react-router-dom'

import { Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { UserFormContainer, UserForm, Loader } from '../../components'

import useForm from '../../hooks/useForm'

export default function ForgotPassword() {
  const dispatch = useDispatch()
  const history = useHistory()

  const { formValues, onChangeForm, resetForm } = useForm()

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(forgotPassword(formValues))
    resetForm()
  }

  const {
    isLoggedIn,
    forgotPasswordPending,
    forgotPasswordFulfilled,
    isUserLoaded,
  } = useSelector((state) => {
    return {
      isLoggedIn: state.user.isLoggedIn,
      forgotPasswordPending: state.user.forgotPasswordPending,
      forgotPasswordFulfilled: state.user.forgotPasswordFulfilled,
      isUserLoaded: state.user.isUserLoaded,
    }
  })

  useEffect(() => {
    if (forgotPasswordFulfilled) history.push('/reset-password')
  }, [history, forgotPasswordFulfilled])

  if (!isUserLoaded) return null

  if (isLoggedIn) return <Redirect to='/' />

  if (forgotPasswordPending) return <Loader />

  return (
    <UserFormContainer title='Восстановление пароля'>
      <UserForm buttonsName='Восстановить' onSubmit={onSubmit}>
        <div className={clsx(styles.userFormInput, 'mt-6')}>
          <Input
            onChange={onChangeForm}
            value={formValues.email || ''}
            name='email'
            type='email'
            placeholder='Укажите e-mail'
          />
        </div>
      </UserForm>
      <p className='text text_type_main-default mb-4'>
        Вспомнили пароль?&nbsp;
        <Link className={styles.userFormLink} to='/login'>
          Войти
        </Link>
      </p>
    </UserFormContainer>
  )
}
