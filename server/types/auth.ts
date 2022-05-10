export type LoginData = {
  login: string,
  password: string
}

export type LoginDataMongo = {
  sessionKey: string,
  endTime: string 
} & LoginData