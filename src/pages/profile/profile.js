import { useEffect } from 'react'
import clsx from 'clsx'

import styles from './profile.module.css'
import userFormStyles from '../../components/user-form/user-form.module.css'

import { useDispatch, useSelector } from 'react-redux'
import { getUser, updateUser } from '../../store/actions/user'

import { Route, useRouteMatch } from 'react-router-dom'

import {
  EmailInput,
  PasswordInput,
  Input,
  Loader,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { UserForm, ProfileNav } from '../../components'

import useForm from '../../hooks/useForm'

export default function Profile() {
  const dispatch = useDispatch()
  const { path } = useRouteMatch()

  const { formValues, onChangeForm, resetForm } = useForm()

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(updateUser(formValues))
  }

  const onReset = () => {
    resetForm(user)
  }

  const { isUserLoaded, user } = useSelector((state) => {
    return {
      isUserLoaded: state.user.isUserLoaded,
      user: state.user.user,
    }
  })

  useEffect(() => {
    if (!user) dispatch(getUser())
    resetForm(user)
  }, [dispatch, resetForm, user])

  if (!isUserLoaded) return <Loader />

  return (
    <Route exact path={path}>
      <section className={styles.grid}>
        <ProfileNav />
        <UserForm
          className={styles.form}
          buttonsName={['Отмена', 'Сохранить']}
          onSubmit={onSubmit}
          onReset={onReset}
        >
          <div className={userFormStyles.userFormInput}>
            <Input
              onChange={onChangeForm}
              value={formValues.name || ''}
              name={'name'}
              placeholder='Имя'
              icon={'EditIcon'}
            />
          </div>
          <div className={clsx(userFormStyles.userFormInput, 'mt-6')}>
            <EmailInput
              onChange={onChangeForm}
              value={formValues.email || ''}
              name={'email'}
            />
          </div>
          <div className={clsx(userFormStyles.userFormInput, 'mt-6')}>
            <PasswordInput
              onChange={onChangeForm}
              value={formValues.password || ''}
              name={'password'}
            />
          </div>
        </UserForm>
      </section>
    </Route>
  )
}
