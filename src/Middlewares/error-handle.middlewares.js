// error handling 

import { ErrorHandlerClass } from "../utilis/error-class.utilis.js";

export const errorHandling= (API)=>{
return (req,res,next)=>{
  
API(req,res,next).catch((err)=>{
    const insights={
        error:"unhandled error"
    }
// Error
next (
    new ErrorHandlerClass (
"Internal server Error",
500,err.stack,
"Error from error handle middleware",
insights
)
)
});
};
};
 
export const globalResponse=(err,req,res,next)=>{
if(err){
    res.status(err["statusCode"]||400).json({
        message:"Internal Server Error",
        error:err.message,
        stack:err.stack,
        errorPostion:err.name,
        data:err.data



    })


}


}