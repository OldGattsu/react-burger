import { FormEvent, FormEventHandler, SyntheticEvent, MouseEvent } from "react";

export interface IUserForm {
  children: JSX.Element
  buttonsName: string | string[]
  onSubmit: (e: FormEvent) => void
  onReset?: (e: SyntheticEvent) => void
  className?: string
}
