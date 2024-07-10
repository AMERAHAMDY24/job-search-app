import Joi from "joi";
import { objectIdValidation } from "../../utilis/objectId.validation.js";




// add company Schema
export const addCompanySchema={
    body:Joi.object({
    companyName: Joi.string().required(),
    description: Joi.string().required(),
    industry:Joi.string().required(),
    address:Joi.string().required(),
    numberOfEmployees:Joi.number().min(11).max(50),
    companyEmail:Joi.string().email().required().trim(),
    companyHR:Joi.string().custom(objectIdValidation).required()

})}

// update Schema

export const updateCompanySchema={

body:Joi.object({
    companyName: Joi.string(),
    description: Joi.string(),
    industry:Joi.string(),
    address:Joi.string(),
    numberOfEmployees:Joi.number().min(11).max(50),
    companyEmail:Joi.string().email().trim(),
    companyHR:Joi.string().custom(objectIdValidation)
})
}



