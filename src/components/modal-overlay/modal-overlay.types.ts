export default interface IModalOverlay {
  children: JSX.Element,
  onClose?: () => void,
  noBlackout?: boolean,
}