import { Router } from "express";

import * as jobController from "./job.controller.js"


import { auth } from "../../Middlewares/auth.middleware.js";
import { authorization } from "../../Middlewares/authorization.middleware.js";
import { errorHandling } from "../../Middlewares/error-handle.middlewares.js";
import { validation } from "../../Middlewares/validation.middleware.js";



import { addApplicationSchema, addJobSchema, updateJobSchema } from "./job.schema.js";


const jobRouter=Router();

jobRouter.post("/addJob",auth(),authorization(["Company_HR"]),validation(addJobSchema),errorHandling(jobController.addJob))

jobRouter.put("/updateJob/:_id",auth(),authorization(["Company_HR"]),validation(updateJobSchema),errorHandling(jobController.updateJob))

jobRouter.delete("/deleteJob/:_id",auth(),authorization(["Company_HR"]),errorHandling(jobController.deleteJob))

jobRouter.get("/listJobs",auth(),authorization(["Company_HR","User"]),errorHandling(jobController.listJobs))

jobRouter.get("/jobsForCompany",auth(),authorization(["Company_HR","User"]),errorHandling(jobController.jobsForCompany))

jobRouter.get("/filterJobs",auth(),authorization(["User","Company_HR"]),errorHandling(jobController.filterJobs))


jobRouter.post("/applyToJob",auth(),authorization(["User"]),validation(addApplicationSchema),errorHandling(jobController.applyToJob))

export default jobRouter;