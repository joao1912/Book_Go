import { IDeleteFavorite, IDeleteMessage } from "../../repositories/favorite/IDeleteFavorite";
import { prisma } from "../db";



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