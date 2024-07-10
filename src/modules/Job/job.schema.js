import Joi from "joi";
import { objectIdValidation } from "../../utilis/objectId.validation.js";


// addJob Schema

export const addJobSchema={
body:Joi.object({
    jobTitle: Joi.string().required(),
    jobLocation: Joi.string().valid("onsite","remotely","hybrid").required(),
    workingTime:Joi.string().valid("part-time","full-time").required(),
    seniorityLevel:Joi.string().valid("Junior","Mid-Level","Senior","Team-Lead","CTO").required(),
    jobDescription:Joi.string().min(11).max(50),
    technicalSkills:Joi.array().required(),
    softSkills:Joi.array().required(),
    addedBy:Joi.string().custom(objectIdValidation).required(),
    companyId:Joi.string().custom(objectIdValidation).required()
})
}




// updateJob Schema

export const updateJobSchema={
body:Joi.object({
jobTitle: Joi.string(),
jobLocation: Joi.string().valid("onsite","remotely","hybrid"),
workingTime:Joi.string().valid("part-time","full-time"),
seniorityLevel:Joi.string().valid("Junior","Mid-Level","Senior","Team-Lead","CTO"),
jobDescription:Joi.string().min(11).max(50),
technicalSkills:Joi.array(),
softSkills:Joi.array()
})
}





// addApplication Schema
export const addApplicationSchema={
body:Joi.object({
    jobID:Joi.string().custom(objectIdValidation).required(),
    userId:Joi.string().custom(objectIdValidation).required(),
    userTechSkills:Joi.array(),
    userSoftSkills:Joi.array()
})}

