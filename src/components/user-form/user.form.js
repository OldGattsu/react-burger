import clsx from 'clsx'

import styles from "./user-form.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

export default function UserForm({
  children,
  buttonName,
  buttonsText,
  onSubmit,
  onReset,
}) {
  return (
    <form
      className={styles.userForm}
      onSubmit={onSubmit}
    >
      <fieldset className={styles.userFormFieldset}>{children}</fieldset>
      <div className="mt-6 mb-20">
        {buttonsText ? (
          <div className={styles.userFormButtons}>
            <Button
              type="secondary"
              size="medium"
              onClick={onReset}
            >
              {buttonsText[1]}
            </Button>
            <Button
              type="primary"
              size="medium"
            >
              {buttonsText[0]}
            </Button>
          </div>
        ) : (
          <Button type="primary" size="medium">
            {buttonName}
          </Button>
        )}
      </div>
    </form>
  );
}
