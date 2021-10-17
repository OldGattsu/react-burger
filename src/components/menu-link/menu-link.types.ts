export default interface IMenuLink {
  name: string
  to: string
  icon: JSX.Element
  iconHover: JSX.Element
  first: boolean
  last: boolean
}