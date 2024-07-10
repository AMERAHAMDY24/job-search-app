import { Types } from "mongoose"




/**
 * @param  value 
 * @param  helper 
 * @returns  value or message
 * @description check if objectId match objectId in mongoose
 */

export const objectIdValidation=(value,helper)=>{

const isObjectIdValid=Types.ObjectId.isValid(value);

return  isObjectIdValid ? value : helper.message("Invalid Object Id")


}