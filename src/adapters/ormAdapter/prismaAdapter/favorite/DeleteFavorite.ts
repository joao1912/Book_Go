import { IDeleteFavorite, IDeleteMessage } from "../../repositories/favorite/IDeleteFavorite.js";
import { prisma } from "../db.js";
import handlePrismaError from "../util/handlePrismaError.js";



export class DeleteFavorite implements IDeleteFavorite {

    async execute(id: string): Promise<IDeleteMessage | void> {
       
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
            
            return handlePrismaError("FavoriteError", error)

        }
    }
}