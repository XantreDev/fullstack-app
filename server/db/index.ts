import { UserInfo } from './../types/user';
import dayjs from 'dayjs';
import md5 from 'md5';
import { MongoClient } from 'mongodb'
import { LoginDataMongo } from '../types/auth';

const client = new MongoClient("mongodb+srv://xantre:xvg9WBvjpdFrt6g@cluster0.ncly3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

export const createUser = async () => {
  try {
    await client.connect()
    const database = await client.db("testDB");
    const result = await database.collection('users')
    console.log(result)

    console.log("success")
  } catch (error) {
    console.log(error)
  } finally {
    await client.close()
  }
}

export const getUser = async (sessionKey: string) => {
  try {
    await client.connect()
    const database = await client.db("testDB");
    const collection = await database.collection('users')
    const result = await collection.findOne({
      sessionKey
    })
    if (result === null) {
      return null
    }
    console.log("success")
  } catch (error) {
    console.log(error)
    return null
  }
}

export const isAuthed = async (sessionKey: string) => {
  try {
    await client.connect()
    const database = await client.db("testDB");
    const collection = await database.collection('users')
    const result = await collection.findOne({
      sessionKey
    })
    if (result === null) {
      return false
    }

    console.log("success")
    return dayjs().isBefore(dayjs(result?.endTime))
  } catch (error) {
    console.log(error)
    return false
  }
}



export const getSession = async (login: string, password: string) => {
  const hash = md5(password)

  try {
    await client.connect()
    const database = await client.db("testDB");
    const collection = await database.collection('users')
    const result = await collection.findOne({
      login,
      password: hash
    })
    if (result === null) {
      return null
    }
    const sessionKey = md5((+dayjs()).toString()) + md5(login)

    console.log( await collection.replaceOne({
      login,
      password: hash
    }, {
      login,
      password: hash,
      endTime: dayjs().add(1, 'day').toISOString(),
      sessionKey,
      sdf: 1
    } as LoginDataMongo), {
      upsert: true,
      writeConcern: true
    })

    console.log("success")
    return sessionKey
  } catch (error) {
    console.log(error)
    return null
  }
}

export const getUsersList = async () => {
  await client.connect()
  const database = await client.db("testDB");
  const collection = await database.collection('user-list')
  return collection
}


export const addUsersToDb = async (users: UserInfo[]) => {
  try {
    const collection = await getUsersList()

    await collection.insertMany(users)

    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export const getUsersFromDb = async () => {
  try {
    const collection = await getUsersList()


    const result = await collection.find({}).limit(10).toArray()
    console.log(result)
    return result    
  } catch (error) {
    console.log(error)
    return []
  }
}