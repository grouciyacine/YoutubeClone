import express from 'express'
import { addVid, addView, deleteVid, getVid, random, search, sub, tags, trend, uppVid } from '../controllers/vedio.js'
import { verifyToken } from '../verifyToken.js'
const app=express.Router()

app.post("/",verifyToken,addVid)
app.put("/:id",verifyToken,uppVid)
app.delete("/:id",verifyToken,deleteVid)
app.get("/find/:id",getVid)
app.put("/view/:id",addView)
app.get("/trend",trend)
app.get("/random",random)
app.get("/sub",verifyToken,sub)
app.get('/tags',tags)
app.get("/search",search)



export default app