import { query } from "express";
import { errorhandler } from "../middlewares/error.js";
import user from "../models/user.js";
import video from "../models/video.js";


export const addVid=async(req,res,next)=>{

try{
const newVid=new video({userId:req.user.id,...req.body})    
const saveVideo=await newVid.save();
res.status(200).json(saveVideo)
}catch(e){
    next(e)
}
}
export const uppVid=async(req,res,next)=>{
    try{
const Vid=await video.findById(req.params.id)
if(!Vid) return next(errorhandler(404,"Video Not Found"))
if(req.user.id===Vid.userId) {
    const update=video.findByIdAndUpdate(req.params.id,{
        $set:req.body
    },{new:true})
    res.status(200).json("Update Vid")
}else{
    return next(errorhandler(403,"You Can Update Only Your Videos"))
}
    }catch(e){
        next(e)
    }
}
export const deleteVid=async(req,res,next)=>{
    try{
        const Vid=await video.findById(req.params.id)
        if(!Vid) return next(errorhandler(404,"Video Not Found"))
        if(req.user.id===Vid.userId) {
            const update=video.findByIdAndDelete(req.params.id)
            res.status(200).json("Delete Vid")
        }else{
            return next(errorhandler(403,"You Can Delete Only Your Videos"))
        }
            }catch(e){
                next(e)
            }
}
export const getVid=async(req,res,next)=>{
    try{
        const vid=await video.findById(req.params.id)
        res.status(200).json(vid)
    }catch(e){
        next(e)
    }
}
export const addView=async (req,res,next)=>{
    try{
await video.findByIdAndUpdate(req.params.id,{
    $inc:{views:1}
})
res.status(200).json("Viw ADD ")
    }catch(e){
next(e)
    }
}
export const trend=async(req,res,next)=>{
    try{
            const vid=await video.find().sort({views:-1}) //-1 from most views to last views and 1 from last to more
            res.status(200).json(vid)
    }catch(e){
next(e)
    }
}
export const random=async(req,res,next)=>{
    try{
const vi=await video.aggregate([{$sample:{size:40}}]) //for random videos
res.status(200).json(vi)
    }catch(e){
next(e)
    }
}
export const sub=async(req,res,next)=>{
    try{
const us=await user.findById(req.user.id)
const subscribedChannel=us.subscribedUsers;
const list=await Promise.all(
    subscribedChannel.map(channelId=>{
        return video.find({userId:channelId}) //for get video that i have subscribed first we create var us that will have all our data from  
                                              //our ID than we will get ALL Channels ID that i Follow than we will use 
                                              //map for get all video from channels  
    })
)
res.status(200).json(list.flat().sort((a,b)=>b.createdAt-a.createdAt))
}catch(e){
next(e)
    }
}
export const tags=async(req,res,next)=>{
    const tag=req.query.tags.split(",")
    console.log(tag)
    try{
const vi=await video.find({tags:{$in:tag}}).limit(20) 
res.status(200).json(vi)
    }catch(e){
next(e)
    }
}
export const search=async(req,res,next)=>{
    const search=req.query.search
    try{
const vi=await video.find({title:{$regex:search,$options:"i"},}).limit(20)
res.status(200).json(vi)
    }catch(e){
next(e)
    }
}
//1h:14
