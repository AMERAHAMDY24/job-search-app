import { Application } from "../../../Database/models/application.model.js";
import { Company } from "../../../Database/models/company.model.js";
import { Job } from "../../../Database/models/job.model.js"

import { ErrorHandlerClass } from "../../utilis/error-class.utilis.js";

// ===============================================================add job =======================================

/**
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @returns {message,newJob}
 * @description add job
 */


export const addJob=async(req,res,next)=>{

// destruct data

const {jobTitle,jobLocation,workingTime,seniorityLevel,jobDescription,technicalSkills,softSkills,addedBy,companyId}=req.body;


// add job
const jobObject={
    jobTitle,
    jobLocation,
    workingTime,
    seniorityLevel,
    jobDescription,
    technicalSkills,
    softSkills,
    addedBy,companyId}
const newJob= await Job.create(jobObject);

// success response
res.status(201).json({message:"job added successfully",newJob})


}


// ========================================================update job=======================================

/**
 * 
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @returns  {message,updatedJob}
 * @description update job
 */


export const updateJob= async (req,res,next)=>{

    // destruct data
const {jobTitle,jobLocation,workingTime,seniorityLevel,jobDescription,technicalSkills,softSkills,addedBy}=req.body;

const {_id}=req.params;
// update job
    const jobObject={
        jobTitle,
        jobLocation,
        workingTime,
        seniorityLevel,
        jobDescription,
        technicalSkills,
        softSkills,
        addedBy
    }
const updatedJob=await Job.findByIdAndUpdate(_id,jobObject,{new:true});

// success response
res.status(200).json({ message:"job updated successfully",updatedJob})
}

// ======================================================dlete job ====================================================
 
/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {message}
 * @description delete job
 */
export const deleteJob=async(req,res,next)=>{
//    destruct data
const {_id}=req.params;

// delete job
 const deletedJob=await Job.findByIdAndDelete(_id);

// success response
res.status(200).json({ message:"job deleted successfully"})
}



// ==============================Get all Jobs with their company’s information =======================================

 
/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {message ,allJobs}
 * @description Get all Jobs with their company’s information.
 */

export const listJobs=async(req,res,next)=>{
// get all jobs
const allJobs= await Job.find().populate({path:"companyId"})

// success response
res.status(200).json({message:"success",allJobs})
}


// ==============================Get all Jobs for a specific company =======================================

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 *  @returns {message,jobs }
 * @description Get all Jobs for a specific company.
 */

export const jobsForCompany= async(req,res,next)=>{
// find specific company by name
const companyName=req.query.name;

const company=await Company.findOne({companyName})

// check if company exist
if(!company){
return next (new ErrorHandlerClass("sorry,this company not found ",404,"error from get Jobs controller")) 
}

//find all Jobs for a specific company.
const jobs= await Job.find({companyId:company._id})

res.status(200).json({message:"success",jobs})

}




// ======================================Get all Jobs that match the following filters ================================================

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {message,alljobs}
 * @description all jobs after filtertion
 */

export const  filterJobs= async(req,res,next)=>{

// filter jobs 
const jobsFiltration= await Job.find({
    workingTime: new RegExp(req.query.workingTime, 'i'),
    jobLocation: new RegExp(req.query.jobLocation, 'i'),
    seniorityLevel: new RegExp(req.query.seniorityLevel, 'i'),
    jobTitle: new RegExp(req.query.jobTitle, 'i'),
    technicalSkills: new RegExp(req.query.technicalSkills, 'i'),
})


// fail response
if(!jobsFiltration.length){
    return next(new ErrorHandlerClass("no jobs are founded",404,"error from get all jobs")) 
}

// success response
res.status(200).json({message:"success",jobsFiltration})


}


// ==========================================================Apply to Job ================================================


/**
 * 
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @returns {message, newApplication }
 * @description apply to job
 */

export const applyToJob=async (req,res, next)=>{

// destruct data
const{jobID,userId,userTechSkills,userSoftSkills}=req.body

// apply to job
const applicationObject={
jobID,
userId,
userTechSkills,
userSoftSkills
}
const newApplication=await Application.create(applicationObject)

// success response
res.status(200).json({message:"success",newApplication})


}