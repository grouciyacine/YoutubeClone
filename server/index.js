import express  from 'express';
import connectDb from './connect.js';
import dotenv from 'dotenv'
import notfound from '../server/middlewares/notfound.js'
import error from '../server/middlewares/error-handler.js'
import userRoute from './routes/user.js'
import commentRoute from './routes/comment.js'
import videoRoute from './routes/vedio.js'
import authRoute from './routes/auth.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'
const app=express()
dotenv.config()
app.use((req,res,next)=>{
  res.header("Access-Control-Allow-Credentials",true)
  next()
  })
  app.use(cors({
      origin:"http://localhost:3000"
  }))
  app.use(express.json())
  app.use(cookieParser())
app.use('/api/v1/auth',authRoute)
app.use('/api/v1/user',userRoute)
app.use('/api/v1/comment',commentRoute)
app.use('/api/v1/videos',videoRoute)
app.use(notfound)
app.use(error)
const start=async()=>{
    try{
await connectDb(process.env.MONGO).then(()=>console.log('connect to db'))
app.listen(8800,console.log('localhost listening in port 8800'))
    }catch(err){
console.log(err)
    }
}
start();