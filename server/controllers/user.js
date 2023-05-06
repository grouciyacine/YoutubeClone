import { errorhandler } from "../middlewares/error.js"
import User from '../models/user.js'
import Vid from '../models/video.js'
export const update=async(req,res,next)=>{
if(req.params.id===req.user.id){
try{
const updateUser=await User.findByIdAndUpdate(req.params.id,{
    $set:req.body
},{new:true}
)
res.status(200).json('update')
}catch(e){
    next(e)
}
}else{
    return next(errorhandler(403,"You can Update Only Your Account "))
}
}
export const delet=async(req,res,next)=>{
    if(req.params.id===req.user.id){
        try{
        const updateUser=await User.findByIdAndDelete(req.params.id)
        res.status(200).json('Delete Successful')
        }catch(e){
            next(e)
        }
        }else{
            return next(errorhandler(403,"You can Delete Only Your Account "))
        }
}
export const getuser=async(req,res,next)=>{
    try{
        const user= await User.findById(req.params.id)
        res.status(200).json(user)
    }catch(e){
        next(e)
    }
    
}
export const subcribe=async(req,res,next)=>{
    try{
await User.findByIdAndUpdate(req.user.id,{
    $push:{subscribedUsers:req.params.id}
})
await User.findByIdAndUpdate(req.params.id,{
    $inc:{subscribers:1}
})
res.status(200).json('Subscription Successful')
    }catch(e){
        next(e)
    }
    
}
export const unsucribe=async(req,res,next)=>{
    try{
await User.findByIdAndUpdate(req.user.id,{
    $pull:{subscribedUsers:req.params.id}
})
await User.findByIdAndUpdate(req.params.id,{
    $inc:{subscribers:-1}
})
res.status(200).json('Unsucribe successful')
    }catch(e){
next(e)
    }
}
export const like=async(req,res,next)=>{
    const id=req.user.id
    const videoId=req.params.videoId
    try{
        await Vid.findByIdAndUpdate(videoId,{
            $addToSet:{like:id},
            $pull:{dislikes:id}
        })
        res.status(200).json('The Video has been Liked')
    }catch(e){
        next(e)
    }
}
export const dislike=async(req,res,next)=>{
    const id=req.user.id
    const videoId=req.params.videoId
    try{
        await Vid.findByIdAndUpdate(videoId,{
            $addToSet:{dislikes:id},
            $pull:{like:id}
        })
        res.status(200).json('Yhe Video has Been Disliked')
    }catch(e){

next(e)
    }
}
