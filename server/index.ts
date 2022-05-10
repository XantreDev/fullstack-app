import { generateUsers } from './helpers/generate';
import { addUsersToDb, getUsersFromDb } from './db/index';
import { LoginData, LoginDataMongo } from './types/auth';
import express from 'express'
import md5 from 'md5'
import dayjs from 'dayjs'
import cookieParser from 'cookie-parser'
import { Cookies } from './types/cookies';
import cors from 'cors'
import { faker } from '@faker-js/faker'
import { getSession, isAuthed } from './db';

// console.log(md5('user'))

const app = express()
const router = express.Router()
app.use(cors())
app.use(express.json())
router.use(cookieParser())

router.use(async (req, res, next) => {
  if (req.path === '/auth') {
    next()
    return
  }

  const cookie = req.headers.cookie ?? ''
  console.log(cookie)
  const startIndex = cookie?.indexOf?.('key')
  let endIndex = cookie?.indexOf?.(';', startIndex)
  endIndex = !endIndex || endIndex < 0 ? cookie?.length : endIndex 
  const key = cookie?.slice?.(startIndex, endIndex)?.split?.("=")?.[1] ?? ''

   
  if (await isAuthed(key)) {
    next()
    return
  }
  res.status(401).send()
})

const port = process.env.PORT || 5000

router.post('/auth', async (req, res) => {
  const authData = req.body as LoginData
  const { login, password } = authData
  const key = await getSession(login, password)
  res.send({
    key,
  })
})

router.get('/', (req, res) => res.send("server"))

router.get('/isAuthed', )

router.post('/users', async (req, res) => {
  const count = (req.body as {count?: number})?.count
  if (!count) {
    res.status(404).send()
    return
  }

  const result = await addUsersToDb(generateUsers(count))

  res.status(result ? 200 : 500).send()
})

router.get('/users', async (req, res) => {
  const users = await getUsersFromDb()

  res.json({users}).send()
})

app.use('/api', router)


app.listen(port, () => console.log("Server is running..."))