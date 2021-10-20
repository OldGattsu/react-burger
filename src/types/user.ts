export interface IUser {
  email: string
  name: string
  password?: string
}

export interface ILogin {
  accessToken: string
  refreshToken: string
  user: IUser
}
