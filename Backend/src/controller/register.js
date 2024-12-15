import { asynchandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/APIerror.js";
import { ApiResponse } from "../utils/APIresponse.js";
import { User } from "../model/user.js";
import otpGenerator from "otp-generator"
import bcrypt from "bcrypt"
import sendEmail from "../utils/otpEmail.js";
const gen_access_refresh_token=async function(userId){
  try {
    const user=await User.findById(userId)
    const accessToken=user.createaccesstoken()
    const refreshToken=user.createrefreshtoken()
    console.log(accessToken)
    await user.save({validateBeforeSave:false})
    return {accessToken,refreshToken}

  } catch (error) {
    throw new ApiError(500,"Something went wrong while generating refresh and access token")
  }
}




const registerUser = asynchandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (username === "") {
    throw new ApiError(400, "Username is required");
  }
  if (email === "") {
    throw new ApiError(400, "email is required");
  }
  if (password === "") {
    throw new ApiError(400, "password is required");
  }

  const existinguser=await User.findOne({email})
  if(existinguser)
  {
    throw new ApiError(409, "User with this email already exists.");
  }
 
  const user=await User.create({
    username,
    email,
    password,
    isRegistered: true 
  })

  const createduser=await User.findById(user._id).select("-password")
  if (!createduser) {
    throw new ApiError(400, "Something went wrong while registering the user ");
  }
 console.log(createduser.isRegistered)
  return res.status(200).json(new ApiResponse(200,createduser,createduser.isRegistered,"Registered Successfully"));
});

const loginUser=asynchandler(async(req,res)=>{
  // take data from the user
    const {email,password}=req.body;
    if(email==="")
      {
        throw new ApiError("Email is required")
      }
    if(password==="")
      {
        throw new ApiError(400,"Password is required");
      }
    
      const existeduser=await User.findOne({email})
      console.log(existeduser)
      if(!existeduser)
      {
        throw new ApiError(400,"User not registered or User Email does not match")
      }

      const checkpassword=await existeduser.isPasswordCorrect(password)
      console.log(checkpassword)
      if(!checkpassword)
      {
        throw new ApiError(400,"Password does not match")
      }

      // if matched generate accesstoken and refreshtoken and send to the user

      const {accessToken,refreshToken}=await gen_access_refresh_token(existeduser._id)

      const loggedinuser=await User.findById(existeduser._id).select("-password")

    const options={
        httpOnly:true,
        secure:true
    }

    return res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken",refreshToken,options).json(new ApiResponse(200,loggedinuser,accessToken,refreshToken,loggedinuser.isRegistered ,"User Logged in successfully"))
  })

const forgotPassword=asynchandler(async(req,res)=>{
  // take email from the user
  const {email}=req.body;
  const user=await User.findOne({email}).select('+otp +otpExpires');
  if(!user)
  {
    throw new ApiError(400,"User not found. Please check the Email")
  }
  // otp system
  const otp=otpGenerator.generate(6,{upperCaseAlphabets:false,specialChars:false, digits: true,lowerCaseAlphabets:false});
  const otpExpiry=Date.now()+10*60*1000;
  console.log(otp);
  // hash the otp
  const hashedOtp=await bcrypt.hash(otp,10);
  //save
  user.otp=hashedOtp;
  user.otpExpiry=otpExpiry;
  console.log(otp,otpExpiry)
  await user.save();
//send otp 
const message=`Your OTP ${otp} is valid for ${otpExpiry} minutes`;

await sendEmail(email,'Password reset OTP',message);

res.status(200).json(new ApiResponse(200,"OTP sent to Email"));
})

const resetPassword=asynchandler(async(req,res)=>{
  const {email,otp,newpassword}=req.body
  const user=await User.findOne({email}).select("+otp");
  if(!user)
  {
    throw new ApiError(400,"User not found . Check email for resetting the password")
  }
  console.log(user.otp)
   const isotpValid=await bcrypt.compare(otp,user.otp);
   if(!isotpValid)
   {
    throw new ApiError(400,"OTP is not correct. Please Check")
   }
   if(user.otpExpiry< Date.now())
   {
    throw new ApiError(400,"OTP expired")
   }
   
   user.otp=undefined;
   user.otpExpiry=undefined;
   user.password=newpassword;
   await user.save();

   res.status(200).json(new ApiResponse(200,"Password Reset Successful"));
})

export {registerUser, loginUser,forgotPassword,resetPassword}