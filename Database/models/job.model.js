import mongoose from "mongoose";

import { Schema,model } from "mongoose";

const jobSchema=Schema(

{
    jobTitle:{
        type:String,
        required:true
    },
    jobLocation:{
        type:String,
        required:true,
        enum:["onsite","remotely","hybrid"]
    },
    workingTime:{

        type:String,
        required:true,
        enum:["part-time","full-time"]
    },
    seniorityLevel:{

        type:String,
        required:true,
        enum:["Junior","Mid-Level","Senior","Team-Lead","CTO"]
    },
    jobDescription:{
    type:String,
    required:true
    },
    technicalSkills:{
        type:[String],
        required:true
    },
    softSkills:{
        type:[String],
        required:true


    },
    addedBy:{

        type:Schema.Types.ObjectId,
        ref:"User"
    },
    companyId:{

        type:Schema.Types.ObjectId,
        ref:"Company"



    }

},


{

    timeStamps:true,
    versionKey:false
}

);

export const Job= model("Job",jobSchema)