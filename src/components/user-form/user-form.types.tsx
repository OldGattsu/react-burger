export interface IUserForm {
  children: JSX.Element
  buttonsName: string
  onSubmit(): (e: MouseEvent) => void
  onReset(): (e: MouseEvent) => void
  className: string
}
