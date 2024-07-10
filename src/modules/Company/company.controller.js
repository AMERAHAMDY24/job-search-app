import { Application } from "../../../Database/models/application.model.js";
import { Company } from "../../../Database/models/company.model.js";
import { Job } from "../../../Database/models/job.model.js";

import { ErrorHandlerClass } from "../../utilis/error-class.utilis.js";

// =============================Add company ===========================================

/**
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @returns {message, company}
 * @description add company
 */

export const addCompany= async(req,res,next)=>{

// destruct data   
 const {companyName,description,industry,address,numberOfEmployees,companyEmail,companyHR}=req.body;


//  check companyName & companyEmail are exist
const company=await Company.findOne({$or:[{companyName},{companyEmail}]})
if(company){
return next(new ErrorHandlerClass("this company already exist",409,"error in company controller"))
}
// add company
const companyObject={
   companyName,
    description,
    industry,
    address,
    numberOfEmployees,
    companyEmail,
    companyHR
}
const newCompany= await Company.create(companyObject);
// success response
res.status(201).json({message:"company added successfully",newCompany})
}



// =============================update company ===========================================


/**
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @returns {message}
 * @description update company data
 */
export const updateCompany=async(req,res,next)=>{
// destruct data
const {companyName,description,industry,address,numberOfEmployees,companyEmail,companyHR}=req.body;

//  check companyName & companyEmail are exist
const company=await Company.findOne({$or:[{companyName},{companyEmail}]})
if(company){
    return next (new ErrorHandlerClass("this data already exist ",409,"error from update controller")) 
}

// update data
const companyObject={
    companyName,
     description,
     industry,
     address,
     numberOfEmployees,
     companyEmail,
     companyHR
    }


const updatedCompany=await Company.updateMany(companyObject)

// success response
res.status(200).json({message:"company updated successfully"})
}


// =============================delete company ===========================================


/**
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @returns {message }
 * @description delete company data
 */
export const deleteCompany=async(req,res,next)=>{
    
const {_id}=req.params;
    // delete company data
    const deletedCompany=await Company.findByIdAndDelete(_id)

    // check if there is a job added by this company

const Jobb=await Job.findOne({companyId:_id})
if(Jobb)
{
    const deleteJob =await Job.findOneAndDelete({companyId:_id})
    res.status(200).json({message:"Company & Job which added by it are deleted Successfully"})

}
       // success response
    res.status(200).json({message:"company deleted successfully"})
    }



// =============================Get company data ===========================================


/**
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @returns {message,company,JobsInCompany}
 * @description get company data and all jobs related to this company
 */

export const getCompanyData= async (req,res,next)=>{

// find data
const company= await Company.findById(req.params.id)

if(!company){
    return next (new ErrorHandlerClass("this company not found ",409,"error from get company data controller")) 

}
const JobsInCompany=await Job.find({addedBy:req.params.id})

// success response
res.status(200).json({message:"success",company,JobsInCompany})
}




// =============================Search for a company with a name ===========================================

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns {message ,company}
 * @description Search for a company with a name. 
 */
export const companyWithAName= async(req,res,next)=>{

 //  find a company
const company= await Company.find({companyName: new RegExp(req.query.companyName, 'i')})

// success response
res.status(200).json({message:"success",company})

}


// =============================Get all applications for specific Jobs ===========================================

/**
* @param {object} req
* @param {object} res
* @param {object} next
* @return {message, allApplications}
* @description Get all applications for specific Jobs
*/

export const allApplications= async(req,res)=>{

// destruct data
const {jobID}=req.params

// find applications data
const applicationWithUser=await Application.find({jobID}).populate({path:"userId"})


// success response
res.status(200).json({message:"success",applicationWithUser})
}


