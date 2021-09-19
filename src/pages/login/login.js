import { useEffect } from "react"
import clsx from 'clsx'
import styles from '../../components/user-form/user-form.module.css'

import { useDispatch, useSelector } from "react-redux"
import { login } from "../../store/actions/user"

import { Link, useHistory } from "react-router-dom";
import { Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components"
import {
  UserFormContainer,
  UserForm,
  Loader
} from  '../../components'

import useForm from "../../hooks/useForm"

export default function Login() {
  const dispatch = useDispatch()
  const history = useHistory()

  const {
    formValues,
    onChangeForm,
    resetForm,
  } = useForm()

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(login(formValues))
    resetForm()
  }

  const {
    isLoggedIn,
    loginPending,
    loginFulfilled,
    loginRejected,
  } = useSelector(state => {
    return {
      isLoggedIn: state.user.isLoggedIn,
      loginPending: state.user.loginPending,
      loginFulfilled: state.user.loginFulfilled,
      loginRejected: state.user.loginRejected,
    }
  })

  useEffect(() => {
    if (isLoggedIn) history.replace('/')
  }, [history, isLoggedIn])

  useEffect(() => {
    if (loginFulfilled) history.replace('/')
    if (loginRejected) resetForm()
  }, [history, loginFulfilled, loginRejected])

  if (loginPending) return (<Loader/>)

  return (
    <UserFormContainer title="Вход">
      <UserForm buttonsName="Войти" onSubmit={onSubmit}>
        <div className={clsx(
          styles.userFormInput,
          'mt-6',
        )}>
          <Input
            onChange={onChangeForm}
            value={formValues.email || ''}
            name='email'
            type='email'
            placeholder='E-mail'
          />
        </div>
        <div className={clsx(
          styles.userFormInput,
          'mt-6',
        )}>
          <PasswordInput
            onChange={onChangeForm}
            value={formValues.password || ''}
            name="password"
          />
        </div>
      </UserForm>
      <p className='text text_type_main-default mb-4'>
        Вы — новый пользователь?&nbsp;
        <Link
          className={styles.userFormLink}
          to='/register'
        >
          Зарегистрироваться
        </Link>
      </p>
      <p className='text text_type_main-default'>
        Забыли пароль?&nbsp;
        <Link
          className={styles.userFormLink}
          to='/forgot-password'
        >
          Восстановить пароль
        </Link>
      </p>
    </UserFormContainer>
  )
}
