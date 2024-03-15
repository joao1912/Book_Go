import { IDeleteAllFavorites } from "../../repositories/favorite/IDeleteAllFavorites";
import { prisma } from "../db";
import handlePrismaError from "../util/handlePrismaError";

export class DeleteAllFavorites implements IDeleteAllFavorites {

    async execute(): Promise<void> {
        
        try {
            
            await prisma.favorite.deleteMany()

        } catch (error) {
            
            return handlePrismaError("FavoriteError", error)

        }
    }
}