import mongoose from "mongoose";
import { Schema,model } from "mongoose";

const companySchema=Schema(
 {
    companyName:{
        type:String,
        required:true,
        unique:true

    },
description:{
type:String,
required:true,
    },

    industry:{
type:String,
required:true,


    },
    address:{

        type:String,
        required:true,

    },
    numberOfEmployees:{

        type:Number,
        min:11,
        max:50
    },
    companyEmail:{

        type:String,
        required:true,
        unique:true
    },
    companyHR:{
   type:Schema.Types.ObjectId,
   required:true,
   ref:"User"
    }
}, 

{timeStamps:true,
        versionKey:false

}
);

export const Company=model("Company",companySchema)