import { prisma } from "../db";

import { IDeleteMessage, IDeleteReservation } from "../../repositories/reservation/IDeleteReservation";
import handlePrismaError from "../util/handlePrismaError";

export class DeleteReservation implements IDeleteReservation {

    async execute(reservationId: string): Promise<IDeleteMessage> {
       
        try {
            
            await prisma.reservation.delete({
                where: {
                    id: reservationId
                }
            })

            const message: IDeleteMessage =  {
                message: 'Reservada deletada com sucesso!'
            }            

            return message

        } catch (error) {
            const message = handlePrismaError(error)
            return {message: message}    

        }
    }
}