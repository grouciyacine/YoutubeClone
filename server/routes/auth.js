import express from 'express'
import { googleAuth, signIn, signup } from '../controllers/auth.js'
const app=express.Router()
//register -login-google
app.post('/register',signup)
app.post('/signin',signIn)
app.post('/google',googleAuth)


export default app