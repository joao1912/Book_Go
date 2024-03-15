import { CreateFavorite } from "../prismaAdapter/favorite/CreateFavorite";
import { DeleteAllFavorites } from "../prismaAdapter/favorite/DeleteAllFavorites";
import { DeleteFavorite } from "../prismaAdapter/favorite/DeleteFavorite";
import { GetAllFavoritesByUserId } from "../prismaAdapter/favorite/GetAllFavoritesByUserId";


export const createFavorite = new CreateFavorite()

export const deleteFavorite = new DeleteFavorite()

export const getAllFavoritesByUserId = new GetAllFavoritesByUserId()

export const deleteAllFavorites = new DeleteAllFavorites()