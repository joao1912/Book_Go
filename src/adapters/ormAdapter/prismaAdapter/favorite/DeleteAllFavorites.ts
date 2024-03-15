import { IDeleteAllFavorites } from "../../repositories/favorite/IDeleteAllFavorites.js";
import { prisma } from "../db.js";
import handlePrismaError from "../util/handlePrismaError.js";

export class DeleteAllFavorites implements IDeleteAllFavorites {

    async execute(): Promise<void> {
        
        try {
            
            await prisma.favorite.deleteMany()

        } catch (error) {
            
            return handlePrismaError("FavoriteError", error)

        }
    }
}