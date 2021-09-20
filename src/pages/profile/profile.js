import { useEffect } from "react"

import styles from "./profile.module.css"
import userFormStyles from '../../components/user-form/user-form.module.css'

import { useDispatch, useSelector } from "react-redux"
import { getUser, updateUser } from "../../store/actions/user"

import {
  Route,
  useRouteMatch,
  useHistory,
  useLocation,
} from "react-router-dom"

import {
  EmailInput,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components"
import { UserForm, ProfileNav } from '../../components'

import useForm from "../../hooks/useForm"

export default function Profile() {
  const dispatch = useDispatch()
  const { path } = useRouteMatch()

  const {
    formValues,
    onChangeForm,
    resetForm,
  } = useForm()

  const {
    user,
    isLoggedIn
  } = useSelector((state) => {
    return {
      user: state.user.user,
      isLoggedIn: state.user.isLoggedIn,
    }
  })

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateUser(formValues)
    );
  }

  const onReset = () => {
    resetForm(user);
  }

  useEffect(() => {
    if (!user) dispatch(getUser())
    resetForm(user)
  }, [])

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
          <>
            <div className={userFormStyles.userFormInput}>
              <Input
                onChange={onChangeForm}
                value={formValues.name || ""}
                name={"name"}
                placeholder="Имя"
                icon={"EditIcon"}
              />
            </div>
            <div className={`${userFormStyles.userFormInput} mt-6`}>
              <EmailInput
                onChange={onChangeForm}
                value={formValues.email || ""}
                name={"email"}
              />
            </div>
            <div className={`${userFormStyles.userFormInput} mt-6`}>
              <PasswordInput
                onChange={onChangeForm}
                value={formValues.password || ""}
                name={"password"}
              />
            </div>
          </>
        </UserForm>
      </section>
    </Route>
  )
}