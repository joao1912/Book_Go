import { prisma } from "../db";

import { IDeleteMessage, IDeleteReservation } from "../../repositories/reservation/IDeleteReservation";

export class DeleteReservation implements IDeleteReservation {

    async execute(bookId: string, userId: string): Promise<IDeleteMessage> {
       
        try {
            
            await prisma.reservation.delete({
                where: {
                    fk_id_book: bookId,
                    fk_id_user: userId
                }
            })

            const message: IDeleteMessage =  {
                message: 'Reservada deletada com sucesso!'
            }            

            return message

        } catch (error) {
            
            throw new Error('internal server error' + error)

        }
    }
}