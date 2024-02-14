import { Router } from "express";
import getAllUsersController from "../../controllers/userController/GetAllUsers";
import signIn from "../../controllers/userController/SignIn";


const userRouter = Router()

userRouter.get('/', getAllUsersController.handle)

userRouter.post('/signIn', signIn.handle)

export default userRouter