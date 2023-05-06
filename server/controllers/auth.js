import mongoose  from "mongoose"
import bcrypt from 'bcryptjs'
import User from '../models/user.js'
import { errorhandler } from "../middlewares/error.js"
import jwt from 'jsonwebtoken'
export const signup=async(req,res,next)=>{
try{
    const salt=bcrypt.genSaltSync(10)
    const hashPassword=bcrypt.hashSync(req.body.password,salt)
const newUser=new User({...req.body,password:hashPassword})
await newUser.save()
res.status(200).json('user has been created')
}catch(e){
next(e)
}
}
export const signIn=async(req,res,next)=>{
    try{
        const user=await User.findOne({name:req.body.name})      
        if(!user) return next(errorhandler(404,"User Not Found"))
        const comparPassword=await bcrypt.compare(req.body.password,user.password)
        if(!comparPassword) return next(errorhandler(400,"Wrong Password"))
        const token=jwt.sign({id:user._id},process.env.JWT)
        const {password,...other}=user._doc
        res.cookie("access_token",token,{
            httpOnly:true,
        }).status(200).json(other)

    }catch(e){
    next(e)
    }
    }

    export const googleAuth=async(req,res,next)=>{
try{
const user=await User.findOne({email:req.body.email})
if(user){
    const token=jwt.sign({id:user.id},process.env.JWT)
    res.cookie("access_token",token,{
        httpOnly:true
    }).status(200).json(user._doc)
}else{
const newUser=new User({
    ...req.body,
    fromGoogle:true,
})
const savedUser=await newUser.save()
const token=jwt.sign({id:savedUser._id},process.env.JWT)
res.cookie("access_token",token,{
    httpOnly:true,
}).status(200).json(savedUser._doc)
}
}catch(e){
  next(err)  
}
    }
//2h:24me
