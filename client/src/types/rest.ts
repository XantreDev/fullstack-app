export type UserInfo = {
  name: string,
  surname: string,
  email: string,
  birthday: string,
  profession: string
}

export type UsersRest = {
  users: UserInfo[]
}