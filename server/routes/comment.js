import express from 'express'
import { create, deleteComment, getComments } from '../controllers/comment.js'
import {verifyToken} from '../verifyToken.js'
const app=express.Router()

app.post('/',verifyToken,create)
app.delete('/:id',verifyToken,deleteComment)
app.get('/:videoId',getComments)


export default app
//1h33m