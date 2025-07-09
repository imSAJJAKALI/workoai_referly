import mongoose from "mongoose";

const candidatesSchema = new mongoose.Schema({
    fullName:{type:String, required:true},
    email:{type:String, required:true},
    phone:{type:Number, required:true},
    jobTitle:{type:String, required:true},
    status:{type:String, enum:["Pending","Reviewed","Hired"], default:"Pending"},
    resume:{type:String, required:true}
},{timestamps:true})

export default mongoose.model("Candidates",candidatesSchema);
  
