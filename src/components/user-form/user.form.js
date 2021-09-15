import clsx from 'clsx'

import styles from "./user-form.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

export default function UserForm({
  children,
  buttonText,
  buttonsText,
  onSubmit,
  onReset,
}) {
  return (
    <form
      className={styles.userForm}
      onSubmit={onSubmit}
    >
      <fieldset className={styles.fieldset}>{children}</fieldset>
      <div className="mt-6 mb-20">
        {buttonsText ? (
          <div className={styles.buttons}>
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
            {buttonText}
          </Button>
        )}
      </div>
    </form>
  );
}
