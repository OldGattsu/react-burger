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

export default function ResetPassword() {
  const {
    formValues,
    onChangeForm,
  } = useForm()

  return (
    <UserFormContainer title="Восстановление пароля">
      <UserForm buttonName="Сохранить">
        <div className={clsx(
          styles.userFormInput,
          'mt-6',
        )}>
          <PasswordInput
            onChange={onChangeForm}
            value={formValues.password || ''}
            name="password"
            placeholder='Введите новый пароль'
          />
        </div>
        <div className={clsx(
          styles.userFormInput,
          'mt-6',
        )}>
          <Input
            onChange={onChangeForm}
            value={formValues.code || ''}
            name='email'
            type='text'
            placeholder='Введите код из письма'
          />
        </div>
      </UserForm>
      <p className='text text_type_main-default mb-4'>
        Вспомнили пароль?{" "}
        <Link
          className={styles.userFormLink}
          to='/login'
        >
          Войти
        </Link>
      </p>
    </UserFormContainer>
  )
}
