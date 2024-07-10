import { ErrorHandlerClass } from "../utilis/error-class.utilis.js";


/**
 * @param {object} schema - Joi schema object
 * @returns  {Function} - Middleware function
 * @description - Middleware function to validate the request data against the schema
*/

const reqKeys=["body","params","query","headers"];


export const validation=(schema)=>{
return (req,res,next)=>{

const validationErrors=[];

for (const key of reqKeys){
const validationResult=schema[key]?.validate(req[key],{abortEarly:false});




      // If there is an error, push the error details to the validationErrors array
      if (validationResult?.error) {
        validationErrors.push(validationResult?.error?.details);
      }
    }

    // If there are validation errors, return the error response  with the validation errors
    validationErrors.length
      ? next(new ErrorHandlerClass("Validation Error", 400, validationErrors))
      : next();
  };
};
