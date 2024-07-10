import mongoose from "mongoose";

import { Schema,model } from "mongoose";

const applicationSchema= Schema(
    {
jobID:{

    type:Schema.Types.ObjectId,
    required:true,
    ref:"Job"
},
userId:{
    type:Schema.Types.ObjectId,
    required:true,
    ref:"User"
},
userTechSkills:{

    type:[String],
    required:true
},
userSoftSkills:{
    type:[String],
    required:true

}


},    
 {
    timeStamps:true,
    versionKey:false
})


export const Application= model("Application",applicationSchema)