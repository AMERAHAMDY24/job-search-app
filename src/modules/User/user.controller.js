import jwt from "jsonwebtoken"
import { compareSync, hashSync } from "bcrypt";

import User from "../../../Database/models/user.model.js";
import { Company } from "../../../Database/models/company.model.js";
import { Job } from "../../../Database/models/job.model.js";



import { auth } from "../../Middlewares/auth.middleware.js";
import { ErrorHandlerClass } from "../../utilis/error-class.utilis.js";
import { Application } from "../../../Database/models/application.model.js";

//=============================================== Sign up====================================================================

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns return response {message ,user}
 * @description create new user
 */

export  const signup =async(req,res,next)=>{
// destruct data from req.body
const { firstName,lastName,userName,recoveryEmail,email,password,DOB,mobileNumber,role}=req.body;
// email check
const isEmailExist=await User.findOne({email})

if(isEmailExist){
return next(new ErrorHandlerClass("Email already Exist",409,"error from signup controller",{email})) 
}
// hash pass
const hashedPassword = hashSync(password,+process.env.SALT_ROUNDS)

// user data
const userObject= {
    firstName,
    lastName,
    userName,
    recoveryEmail,
    email,
    password:hashedPassword,
    DOB,
    mobileNumber,
    role
}

// create user
const user= await User.create(userObject)
// success response
res.status(201).json({message:"user created successfully",user})
    
}

//================================================ Signin===================================================

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} {message ,token ,newUser with online status }
 * @description  login user
 */

export const signin=async (req,res,next)=>{
// destruct data
const {email,password, mobileNumber}=req.body;
// check email || mobile number
const user=await User.findOne({$or:[{email},{mobileNumber}]})
if(!user){
return next(new ErrorHandlerClass("Invalid login credentials",404,"error from signin controller")) 
}

// match password
const isMatch=compareSync(password,user.password)
if(!isMatch){
return next(new ErrorHandlerClass("Invalid login credentials",404,"error from signin controller")) 
}
// generate Token
const token=jwt.sign({userId:user._id,email:user.email},"jobapp",{expiresIn:"2h"})
// update UserStatus
user.status="online"
const newUser= await user.save()

//success response
res.status(200).json({message:"user logged in successfully",token,newUser})

} 

//============================================ update account ===================================================

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns  {message , updatedUser }
 * @description update user account
 * 
 */

export const updateAccount= async(req,res,next)=>{

// destruct data 
const {_id}=req.authUser;

const {email,mobileNumber,recoveryEmail,lastName,firstName,userName,status,role}=req.body;

// check mobile || email are exist
const user=await User.findOne({$or:[{email},{mobileNumber}]})
if(user){
return next (new ErrorHandlerClass("this data already exist ",409,"error from update controller")) 
}

// update data 
const updatedUser= await User.findByIdAndUpdate(_id,{email,mobileNumber,recoveryEmail,firstName,lastName,userName,status,role},{new:true})

//success response
res.status(201).json({message:"user updated Successfully",updatedUser})

}

//=================================================== delete account =============================================================

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {message}
 * @description delete user account and related data
 * 
 */
export const deleteAccount= async(req,res,next)=>{

// destruct data
const{_id}=req.authUser;

// delete Account => if Account belongs to 

// delete user Account
const deleteAccount= await User.findByIdAndDelete(_id);


// delete  Company if  it added by this account

const company=await Company.findOne({companyHR:deleteAccount._id})
if(company){
const deleteCompanyy= await Company.findOneAndDelete({companyHR:deleteAccount._id});

// delete  Job if  it added by this account
const Jobb=await Job.findOne({companyHR:deleteAccount._id})
if(Jobb)
{
    const deleteJob =await Job.findOneAndDelete({companyId:deleteCompanyy._id})
    res.status(200).json({message:"companyHR & Company & Job which added by  him are deleted Successfully"})

}

res.status(200).json({message:"companyHR & Company which added by  him are deleted Successfully"})

}

 // delete  Application if  it added by this account

const App=await Application.findOne({userId:deleteAccount._id})
if(App)
{
    const deleteApplication= await Application.findOneAndDelete({userId:deleteAccount._id})

    res.status(200).json({message:"User & Application he apply to it are deleted Successfully"})

}

//success response

res.status(200).json({message:"User is deleted successfully "})
}



//=============================================================== Get user account data  =============================================================


/**
* @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {message,UserData}
 * @description get user account data
 */

export const listUserData= async(req,res,next)=>{
// destruct data
const {_id}=req.authUser;

// get user data
const userData= await User.findById(_id)

//success response
res.status(200).json({message:"Success",userData})
}

//============================================ Get profile data for another user =============================================================


/**
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @returns {message,profileData}
 * @description Get profile data for another user
 */

export const  anyProfileData= async(req,res,next)=>{

// destruct data
const {userId}=req.params;

// find data
const profileData=await User.findById(userId).select("-password")

//success response
res.status(200).json({message:"Success",profileData})

}

// =========================================================update password=======================================================================

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {message}
 * @description update password
 */

export const updatePassword=async(req,res,next)=>{
// destruct data
const {_id}=req.authUser
const {password}=req.body

// find user data
const user= await User.findById(_id)

//update data & hash password 
user.password=hashSync(password,+process.env.SALT_ROUNDS)

// save Updated data
user.save()

// success response
res.status(200).json({message:"password Updated Successfully"})
}


// =================================================Get all accounts associated to a specific recoveryEmail ====================================


/**
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * 
 */

export const accountsWithRE= async(req,res,next)=>{

    const allAcounts= await User.find({recoveryEmail:req.params._email})

    res.status(200).json({message:"success",allAcounts})



}