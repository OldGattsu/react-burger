import { SyntheticEvent } from "react";

export interface IUserForm {
  children: JSX.Element
  buttonsName: string | string[]
  onSubmit: (e: any) => void
  onReset?: (e: SyntheticEvent) => void
  className?: string
}
