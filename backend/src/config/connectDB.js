import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log({success:true, message:"server is successfully connected to DB"});
    } catch (error) {
        console.log({success:false, message:"server is not connected to DB", error: error.message})
        process.exit(1);
    }
}


export default connectDB;
