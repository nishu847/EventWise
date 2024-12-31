import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

const userSchema=new mongoose.Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true  // If this needs to be unique, use this constraint
      },
      email: {
        type: String,
        required: true,
        unique: true, // Ensure this is unique if needed
        lowercase: true,
        trim: true
      },
    password:{
        type:String,   // encrypted string to be used
        required:[true,"password required"],
        min:8,
        max:50
    },
    role:{
        type:String,
        required:[true,"Please specify the role"],
        enum:["Student","Organizer","Admin"]
    },
    isLoggedin:{
        type:Boolean,
        default:false,
        enum:[true,false]
    },
    otp:{
        type:String,
        select:false
    },
    otpExpiry:{
        type:Date,
        select:false

    }
},{timestamps:true})

//passowrd ko hash krna using bcrypt

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return;
    this.password=await bcrypt.hash(this.password,10);
    next();
})

userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.createaccesstoken= function(){
    return jwt.sign(
         {
              _id: this._id,
             email:this.email,
             username:this.username,
             role:this.role
         },
         process.env.ACCESS_TOKEN_SECRET_KEY,
         {
             expiresIn:process.env.ACCESS_TOKEN_EXPIRY
         }
     )
 }
 
 
 userSchema.methods.createrefreshtoken =function(){
    return jwt.sign(
         {
         _id:this._id,
         username:this.username,
         role:this.role
         },
     process.env.REFRESH_TOKEN_SECRET_KEY,
     {
         expiresIn:process.env.REFRESH_TOKEN_EXPIRY
     }
 )
 }
 
export const User=mongoose.model("User",userSchema)
