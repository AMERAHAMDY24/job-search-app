import Joi from "joi";




// signup Schema
export const signUpSchema={

    body:Joi.object({
    firstName: Joi.string().required().min(3).max(30),
    lastName: Joi.string().required(),
    userName:Joi.string().required(),
    email:Joi.string().email().required().trim(),
    password:Joi.string().required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$!%*?&])[A-Za-z\d$!%*?&]{8,}$/).
    messages({
    "string.pattern.base":
          "Password must have at least one lowercase letter, one uppercase letter, one number and one special character",
        "any.required": "You need to provide a password",
        "string.min": "Password should have a minimum length of 3 characters"}),
    recoveryEmail:Joi.string().email(),
    DOB:Joi.date().required(),
    mobileNumber:Joi.string().length(11).required(),
    role:Joi.string().valid("User","Company_HR").required(),
    status:Joi.string().valid("offline","online")
})}



// signin Schema.
export const signInSchema={
body:Joi.object({
email:Joi.string().email().trim(),
password:Joi.string().required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$!%*?&])[A-Za-z\d$!%*?&]{8,}$/),
mobileNumber:Joi.string().length(11)
})}



// updateUser Schema

export const updateUserSchema={

body:Joi.object({

email:Joi.string().email().trim(),
mobileNumber:Joi.string().length(11),
recoveryEmail:Joi.string().email(),
lastName:Joi.string(),
firstName: Joi.string().min(3).max(30),
userName:Joi.string(),
status:Joi.string().valid("offline","online"),
role:Joi.string().valid("User","Company_HR")
}),
}



// updatePassword


export const updatePasswordSchema={
body:Joi.object({
password:Joi.string().required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$!%*?&])[A-Za-z\d$!%*?&]{8,}$/).
messages({
"string.pattern.base":
"Password must have at least one lowercase letter, one uppercase letter, one number and one special character",
"any.required": "You need to provide a password",
"string.min": "Password should have a minimum length of 3 characters"}),
})
}
