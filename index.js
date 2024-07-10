import express from "express"
import path from "path"
import { config } from "dotenv";

import { dbConnection } from "./Database/dbConnection.js";
import { globalResponse } from "./src/Middlewares/error-handle.middlewares.js";


import userRouter from "./src/modules/User/user.routes.js";
import companyRouter from "./src/modules/Company/company.routes.js";
import jobRouter from "./src/modules/Job/job.routes.js";



const app = express()

if(process.env.NODE_ENV=="dev"){
config({path: path.resolve(".dev.env")})
}

if(process.env.NODE_ENV=="prod"){
config({path: path.resolve(".prod.env")})
}

config();

let port = process.env.PORT


app.use(express.json());


app.use("/users",userRouter)
app.use("/company",companyRouter)
app.use("/jobs",jobRouter)


app.use(globalResponse);



dbConnection()

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))