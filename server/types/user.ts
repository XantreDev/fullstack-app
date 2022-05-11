import { ObjectId } from "mongodb"

export type UserInfo = {
  name: string,
  surname: string,
  email: string,
  birthday: string,
  profession: string
}

export type UserInfoMongo = UserInfo & { _id: ObjectId }