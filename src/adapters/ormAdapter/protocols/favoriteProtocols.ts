import { CreateFavorite } from "../prismaAdapter/favorite/CreateFavorite.js";
import { DeleteAllFavorites } from "../prismaAdapter/favorite/DeleteAllFavorites.js";
import { DeleteFavorite } from "../prismaAdapter/favorite/DeleteFavorite.js";
import { GetAllFavoritesByUserId } from "../prismaAdapter/favorite/GetAllFavoritesByUserId.js";


export const createFavorite = new CreateFavorite()

export const deleteFavorite = new DeleteFavorite()

export const getAllFavoritesByUserId = new GetAllFavoritesByUserId()

export const deleteAllFavorites = new DeleteAllFavorites()