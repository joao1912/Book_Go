import {Router} from 'express';

import getAllUsersController from '../../controllers/userController/GetAllUsers';
import createUserController from '../../controllers/userController/CreateUser';
import deleteFavoriteController from '../../controllers/userController/DeleteFavorite';
import deleteUserController from '../../controllers/userController/DeleteUser';
import updateUserController from '../../controllers/userController/UpdateUser';
import createFavoriteController from '../../controllers/userController/CreateFavorite';
import getMyFavoritesController from '../../controllers/userController/GetMyFavorites';
import loginController from '../../controllers/userController/Login';

import Auth from '../../middlewares/Auth';


const userRouter = Router();

userRouter.get('/', Auth.execute, getAllUsersController.handle);

userRouter.get('/myFavorites', Auth.execute, getMyFavoritesController.handle);

userRouter.post('/signIn', createUserController.handle);

userRouter.post('/login', loginController.handle);

userRouter.post('/addFavorite/:bookId', Auth.execute, createFavoriteController.handle);

userRouter.put('/update', Auth.execute, updateUserController.handle);

userRouter.delete('/removeFavorite/:favoriteId', Auth.execute, deleteFavoriteController.handle);

userRouter.delete('/deleteUser/', Auth.execute, deleteUserController.handle);


export default userRouter;
