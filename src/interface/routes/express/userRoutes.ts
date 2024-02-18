import { Router } from "express";
import getAllUsers from "../../controllers/userController/GetAllUsers";
import createUser from "../../controllers/userController/CreateUser";
import deleteFavorite from "../../controllers/userController/DeleteFavorite";
import deleteUser from "../../controllers/userController/DeleteUser";
import updateUserController from "../../controllers/userController/UpdateUser";


const userRouter = Router()

userRouter.get('/', getAllUsers.handle)

userRouter.post('/signIn', createUser.handle)

userRouter.post('/update/:id', updateUserController.handle)

userRouter.delete('/removeFavorite/:favoriteId', deleteFavorite.handle)

userRouter.delete('/deleteUser/', deleteUser.handle)

export default userRouter