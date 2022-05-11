import { ObjectId } from 'mongodb';
export type LoginData = {
  login: string,
  password: string,
  isAdmin?: boolean
}

export type LoginDataMongo = {
  sessionKey: string,
  endTime: string,
} & LoginData & { _id: ObjectId}