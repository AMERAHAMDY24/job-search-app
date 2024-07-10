import { Router } from "express";

import * as companyController from "./company.controller.js"


import { errorHandling } from "../../Middlewares/error-handle.middlewares.js";
import { auth } from "../../Middlewares/auth.middleware.js";
import { authorization } from "../../Middlewares/authorization.middleware.js";
import { validation } from "../../Middlewares/validation.middleware.js";


import { addCompanySchema, updateCompanySchema } from "./company.schema.js";


const companyRouter=Router();


companyRouter.post("/addCompany",auth(),authorization(["Company_HR"]),validation(addCompanySchema),errorHandling(companyController.addCompany))

companyRouter.put("/updateCompany",auth(),authorization(["Company_HR"]),validation(updateCompanySchema),errorHandling(companyController.updateCompany))

companyRouter.delete("/deleteCompany/:_id",auth(),authorization(["Company_HR"]),errorHandling(companyController.deleteCompany))

companyRouter.get("/getCompanyData/:id",auth(),authorization(["Company_HR"]),errorHandling(companyController.getCompanyData))

companyRouter.get("/companyWithAName",auth(),authorization(["Company_HR","User"]),errorHandling(companyController.companyWithAName))

companyRouter.get("/allApplications/:jobID",auth(),authorization(["Company_HR"]),errorHandling(companyController.allApplications))


export default companyRouter