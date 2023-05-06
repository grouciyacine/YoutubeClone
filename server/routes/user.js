import express from 'express'
import { delet, dislike, getuser, like, subcribe, unsucribe, update } from '../controllers/user.js'
import { verifyToken } from '../verifyToken.js'
const app=express.Router()

app.put("/:id",verifyToken,update)
app.get("/find/:id",getuser)
app.delete("/:id",verifyToken,delet)
app.put("/sub/:id",verifyToken,subcribe)
app.put("/uns/:id",verifyToken,unsucribe)
app.put("/like/:videoId",verifyToken,like)
app.put("/dislike/:videoId",verifyToken,dislike)




export default app
//55m