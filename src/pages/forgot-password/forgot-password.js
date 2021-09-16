import clsx from 'clsx'
import styles from '../../components/user-form/user-form.module.css'

import { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components"
import { UserFormContainer, UserForm } from  '../../components'

import useForm from "../../hooks/useForm"

export default function ForgotPassword() {
  const {
    formValues,
    onChangeForm,
  } = useForm()

  return (
    <UserFormContainer title="Восстановление пароля">
      <UserForm buttonName="Восстановить">
        <div className={clsx(
          styles.userFormInput,
          'mt-6',
        )}>
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
