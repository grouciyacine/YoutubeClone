import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please provide a name'],
        unique:true,

    },
    email:{
        type:String,
        required:[true,'please provide email'],
        unique:true,

    },
    password:{
        type:String,
    },
    img:{
        type:String,
},
subscribers:{
type:Number,
default:0,
},
subscribedUsers:{
    type:[String]
},
fromGoogle:{
    type:Boolean,
    default:false,
}
},{timestamps:true})
export default mongoose.model('User',UserSchema)