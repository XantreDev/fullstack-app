import { getKey } from './helpers/get';
import { generateUsers } from './helpers/generate';
import { addUsersToDb, deleteUserFromDbByEmail, getUsersFromDb, isAdmin } from './db';
import { LoginData, LoginDataMongo } from './types/auth';
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { getSession, isAuthed } from './db';
import authRouter from './router/auth'
import path from 'path';
import md5 from 'md5';


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


console.log(md5('admin'))
const port = process.env.PORT || 5000

router.use(authRouter)

router.get('/', (req, res) => res.send("server"))

router
  .route("/users")
  .post(async (req, res) => {
    if (!await isAdmin(getKey(req))) {
      res.status(403).send()
    }

    const count = (req.body as { count?: number })?.count;
    if (!count) {
      res.status(404).send();
      return;
    }

    const result = await addUsersToDb(generateUsers(count));

    res.status(result ? 200 : 500).send();
  })
  .delete(async (req, res) => {
    if (!await isAdmin(getKey(req))) {
      res.status(403).send()
    }

    const email = (req.body as { email?: string })?.email;
    if (!email) {
      res.status(404).send();
      return;
    }

    const result = await deleteUserFromDbByEmail(email);

    res.status(result ? 200 : 500).send();
  })
  .get(async (req, res) => {
    const users = await getUsersFromDb();

    res.json({ users });
  });

app.use('/api', router)

app.listen(port, () => console.log("Server is running..."))