import { errorhandler } from '../middlewares/error.js'
import comment from '../models/comment.js'
import vid from '../models/video.js'
export const create=async(req,res,next)=>{
try{
const comme=new comment({...req.body,userId:req.user.id})
const save=await comme.save()
return res.status(200).json(save)
}catch(e){
    next(e)
}
}
export const deleteComment=async(req,res,next)=>{
    try{        
        const comme=await comment.findById(req.params.id)
        const video=await vid.findById(req.params.id)
    if(req.user.id===comme.userId || req.user.id===video.userId){
            await comment.findByIdAndDelete(req.params.id)
            res.status(200).json("the Comment Has Been Deleted")
    }else{
        return next(errorhandler(403,"You can Delete Only Your Comment"))
    }
    }catch(e){
        next(e)
    }
}
export const getComments=async(req,res,next)=>{
    try{
    const com=await comment.find({videoId:req.params.videoId})
res.status(200).json(com)    
}catch(e){
        next(e)
    }
}
