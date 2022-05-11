import { getSession } from './../db/index';
import { LoginData } from './../types/auth';
import { Router } from "express";

const router = Router()

router.post('/unauth', async (req, res) => {
  res.clearCookie('key').send()
})

router.post('/auth', async (req, res) => {
  const authData = req.body as LoginData
  const { login, password } = authData
  const { sessionKey: key, isAdmin } = await getSession(login, password)
  
  if (!key) {
    res.status(404).send()
    return
  }
  
  if (isAdmin) res.cookie('is_admin', true)
  else { res.clearCookie('is_admin') }
  res.cookie('key', key).send()
})

export default router