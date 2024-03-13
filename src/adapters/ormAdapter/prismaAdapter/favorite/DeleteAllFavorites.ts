import { IDeleteAllFavorites } from "../../repositories/favorite/IDeleteAllFavorites.js";
import { prisma } from "../db.js";

export class DeleteAllFavorites implements IDeleteAllFavorites {

    async execute(): Promise<void> {
        
        try {
            
            await prisma.favorite.deleteMany()

        } catch (error) {
            
            throw new Error('Interal server error')

        }
    }
}