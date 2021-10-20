export default interface IModal {
  children: JSX.Element
  title?: string
  onClose: () => void
}