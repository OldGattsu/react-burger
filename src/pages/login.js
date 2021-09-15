import { useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { UserFormContainer, UserForm } from  '../components'

export default function Login() {
  return (
    <UserFormContainer title="Вход">
      <UserForm buttonText="Войти" className="login">


      </UserForm>
      <p className="text text_type_main-default mb-4">
        Вы — новый пользователь?{" "}
        <Link to="/register">
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-default">
        Забыли пароль?{" "}
        <Link to="/forgot-password">
          Восстановить пароль
        </Link>
      </p>
    </UserFormContainer>
  );
}
