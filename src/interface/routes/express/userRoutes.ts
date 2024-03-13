import {Router} from 'express';

import getAllUsersController from '../../controllers/userController/GetAllUsers.js';
import createUserController from '../../controllers/userController/CreateUser.js';
import deleteFavoriteController from '../../controllers/userController/DeleteFavorite.js';
import deleteUserController from '../../controllers/userController/DeleteUser.js';
import updateUserController from '../../controllers/userController/UpdateUser.js';
import createFavoriteController from '../../controllers/userController/CreateFavorite.js';
import getMyFavoritesController from '../../controllers/userController/GetMyFavorites.js';
import loginController from '../../controllers/userController/Login.js';

import Auth from '../../middlewares/Auth.js';

const userRouter = Router();

userRouter.get('/', Auth.execute, getAllUsersController.handle);

userRouter.get('/myFavorites', Auth.execute, getMyFavoritesController.handle);

userRouter.post('/signIn', createUserController.handle);

userRouter.post('/login', loginController.handle);

userRouter.post('/addFavorite/:bookId', Auth.execute, createFavoriteController.handle);

userRouter.put('/update/:id', Auth.execute, updateUserController.handle);

userRouter.delete(
  '/removeFavorite/:favoriteId',
  Auth.execute,
  deleteFavoriteController.handle
);

userRouter.delete('/deleteUser/', Auth.execute, deleteUserController.handle);

export default userRouter;
