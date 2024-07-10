
import { Schema,model } from "mongoose";

const userSchema=new Schema(
{
    firstName:{
        type:String,
        required:true
    },

    lastName:{
        type:String,
        required:true
    },

    userName:{
        type:String,
        required:true


    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{

        type:String,
        required:true
    },
    recoveryEmail:{

        type:String,
        unique:false
    },
    DOB:{

        type:Date,
        required:true

    },
    mobileNumber:{

        type:Number,
        required:true,
        unique:true
    },
    role:{
        type:String,
        required:true,
        enum:["User","Company_HR"]
    },
    status:{

        type:String,
        default:"offline",
        enum:["offline","online"]
    }
},
    
{timestamps:true,
        versionKey:false
}
)

const User= model("User",userSchema)

export default User;