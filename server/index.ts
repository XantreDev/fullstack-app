import { getKey } from './helpers/get';
import { generateUsers } from './helpers/generate';
import { addUsersToDb, getUsersFromDb } from './db/index';
import { LoginData, LoginDataMongo } from './types/auth';
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { getSession, isAuthed } from './db';
import path from 'path';


const app = express()
const router = express.Router()
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(cookieParser())

router.use(async (req, res, next) => {
  if (req.path === '/auth') {
    next()
    return
  }

  const key = getKey(req)

  if (await isAuthed(key)) {
    next()
    return
  }
  res.status(401).end()
})

const port = process.env.PORT || 5000

router.post('/auth', async (req, res) => {
  const authData = req.body as LoginData
  const { login, password } = authData
  const key = await getSession(login, password)
  
  if (!key) {
    res.status(404).send()
    return
  }
  
  res.cookie('key', key).send()
})

router.get('/', (req, res) => res.send("server"))

router
  .route("/users")
  .post(async (req, res) => {
    const count = (req.body as { count?: number })?.count;
    if (!count) {
      res.status(404).send();
      return;
    }

    const result = await addUsersToDb(generateUsers(count));

    res.status(result ? 200 : 500).send();
  })
  .get(async (req, res) => {
    const users = await getUsersFromDb();

    res.json({ users });
  });

app.use('/api', router)

app.listen(port, () => console.log("Server is running..."))