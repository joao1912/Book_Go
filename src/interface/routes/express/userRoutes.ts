import { Router } from "express";
import getAllUsersController from "../../controllers/userController/getAllUsers";


const userRouter = Router()

userRouter.get('/', getAllUsersController.handle)

export default userRouter