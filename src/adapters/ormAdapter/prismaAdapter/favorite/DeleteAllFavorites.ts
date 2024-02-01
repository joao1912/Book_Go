import { IDeleteAllFavorites } from "../../repositories/favorite/IDeleteAllFavorites";
import { prisma } from "../db";

export class DeleteAllFavorites implements IDeleteAllFavorites {

    async execute(): Promise<void> {
        
        try {
            
            await prisma.favorite.deleteMany()

        } catch (error) {
            
            throw new Error('Interal server error')

        }
    }
}