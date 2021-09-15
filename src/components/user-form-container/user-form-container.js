import clsx from 'clsx'
import styles from "./user-form-container.module.css";

export default function UserFormContainer ({ children, title }) {
  return (
    <section className={styles.section}>
      <h1 className={clsx(
        'text', 'text_type_main-medium',
      )}>
        {title}
      </h1>
      {children}
    </section>
  );
}