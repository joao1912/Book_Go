import { IDeleteFavorite, IDeleteMessage } from "../../repositories/favorite/IDeleteFavorite";
import { prisma } from "../db";



export class DeleteFavorite implements IDeleteFavorite {

    async execute(userId: string, bookId: string): Promise<IDeleteMessage> {
       
        try {

            await prisma.favorite.delete({
                where: {
                    fk_id_book: bookId,
                    fk_id_user: userId 
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