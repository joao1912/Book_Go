import { IDeleteAllFavorites } from "../../repositories/favorite/IDeleteAllFavorites";
import { prisma } from "../db";
import handlePrismaError from "../util/handlePrismaError";

export class DeleteAllFavorites implements IDeleteAllFavorites {
    //@ts-ignore
    async execute(): Promise<void> {
        
        try {
            
            await prisma.favorite.deleteMany()

        } catch (error) {
            
            handlePrismaError("FavoriteError", error)
          
        }
    }
}