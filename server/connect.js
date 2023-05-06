import mongoose from "mongoose";
mongoose.set('strictQuery', true)
function connectDb(url){
    return mongoose.connect(url)
}
export default connectDb
