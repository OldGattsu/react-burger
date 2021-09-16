import clsx from 'clsx'
import styles from '../../components/user-form/user-form.module.css'

import { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components"
import { UserFormContainer, UserForm } from  '../../components'

import useForm from "../../hooks/useForm"

export default function Login() {
  const {
    formValues,
    onChangeForm,
  } = useForm()

  return (
    <UserFormContainer title="Вход">
      <UserForm buttonName="Войти">
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
        Вы — новый пользователь?{" "}
        <Link
          className={styles.userFormLink}
          to='/register'
        >
          Зарегистрироваться
        </Link>
      </p>
      <p className='text text_type_main-default'>
        Забыли пароль?{" "}
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
