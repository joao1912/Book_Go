import { IDeleteFavorite, IDeleteMessage } from "../../repositories/favorite/IDeleteFavorite";
import { prisma } from "../db";
import handlePrismaError from "../util/handlePrismaError";



export class DeleteFavorite implements IDeleteFavorite {

    async execute(id: string): Promise<IDeleteMessage> {
       
        try {

            await prisma.favorite.delete({
                where: {
                   id: id
                }
            })

            return {
                message: 'O livro foi removido dos favoritos'
            }
            
        } catch (error) {
            
            handlePrismaError("FavoriteError", error)
            throw error
        }
    }
}