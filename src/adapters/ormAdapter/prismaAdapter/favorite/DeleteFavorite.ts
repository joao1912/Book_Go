import { IDeleteFavorite, IDeleteMessage } from "../../repositories/favorite/IDeleteFavorite.js";
import { prisma } from "../db.js";



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
            
            throw new Error('Internal server error' + error)

        }
    }
}