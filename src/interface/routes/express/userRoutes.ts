import { Router } from "express";

import getAllUsersController from "../../controllers/userController/GetAllUsers";
import createUserController from "../../controllers/userController/CreateUser";
import deleteFavoriteController from "../../controllers/userController/DeleteFavorite";
import deleteUserController from "../../controllers/userController/DeleteUser";
import updateUserController from "../../controllers/userController/UpdateUser";
import createFavoriteController from "../../controllers/userController/CreateFavorite";
import getMyFavoritesController from "../../controllers/userController/GetMyFavorites";



const userRouter = Router()

userRouter.get('/', getAllUsersController.handle)

userRouter.get('/myFavorites', getMyFavoritesController.handle)

userRouter.post('/signIn', createUserController.handle)

userRouter.post('/update/:id', updateUserController.handle)

userRouter.post('/addFavorite', createFavoriteController.handle)

userRouter.delete('/removeFavorite/:favoriteId', deleteFavoriteController.handle)

userRouter.delete('/deleteUser/', deleteUserController.handle)

export default userRouter