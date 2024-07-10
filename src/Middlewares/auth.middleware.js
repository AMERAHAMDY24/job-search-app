import jwt from "jsonwebtoken"


import User from "../../Database/models/user.model.js";

// authentication middleware

/**
 * destructing the token from req.headers
 * @returns {object} req
 * @returns {object} res
 * @returns {object} next
 * @description 
*/

export const auth=()=>{
return async (req,res,next)=>{
    const {token}=req.headers;
// check token
    if(!token){
      return   res.status(400).json({message:"please signin first,there is no token " })
    }
if(!token.startsWith("jobapp"))
{
return   res.status(404).json({message:"Invalid token" })
}
// get original token
const originalToken=token.split(" ")[1]

// decode token
const decodedData=jwt.verify(originalToken,"jobapp")
if(!decodedData?.userId){
return res.status(404).json({message:"Invalid token playload" })
}

// find user
const user=await User.findById(decodedData.userId).select("-password")
if(!user){
return res.status(404).json({message:"user not found,please signup and try again" })
}
// transpor the data to next middleware
req.authUser=user
next();

}    
}