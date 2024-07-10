// mongodb://localhost:27017/notes-app => url local db

import mongoose from "mongoose";


export const dbConnection=async()=>{
try{
await mongoose.connect(process.env.CONNECTION_DB_URI)
console.log("database connected successfully");
}catch(error){

    console.log("Error connection to database ");

}

}

