import { Router } from "express";


import * as userController from "./user.controller.js" 


import { auth } from "../../Middlewares/auth.middleware.js";
import { errorHandling } from "../../Middlewares/error-handle.middlewares.js";
import { validation } from "../../Middlewares/validation.middleware.js";


import { signInSchema, signUpSchema, updatePasswordSchema, updateUserSchema} from "./user.schema.js";


const userRouter=Router();


userRouter.post("/signup",validation(signUpSchema),errorHandling(userController.signup))

userRouter.post("/signin",validation(signInSchema),errorHandling(userController.signin))

userRouter.put("/updateAccount",auth(),validation(updateUserSchema),errorHandling(userController.updateAccount))

userRouter.patch("/updatePassword",auth(),validation(updatePasswordSchema),errorHandling(userController.updatePassword))

userRouter.delete("/deleteAccount",auth(),errorHandling(userController.deleteAccount))


userRouter.get("/getUserData",auth(),errorHandling(userController.listUserData))

userRouter.get("/ProfileData/:userId",errorHandling(userController.anyProfileData))


userRouter.get("/accountsWithRE/:_email",errorHandling(userController.accountsWithRE))





export default userRouter;