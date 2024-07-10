import { ErrorHandlerClass } from "../utilis/error-class.utilis.js";

export const authorization=(allowedRoles)=>{

return async(req,res,next)=>{

    const user= req.authUser;

if(!allowedRoles.includes(user.role)){
    return next (new ErrorHandlerClass("Authorization Error",401,"you are not allowed to access this route"))}

return next()
}
}