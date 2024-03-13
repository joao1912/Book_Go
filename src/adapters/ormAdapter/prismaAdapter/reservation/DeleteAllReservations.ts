import { prisma } from "../db.js";

import { IDeleteMessage, IDeleteReservation } from "../../repositories/reservation/IDeleteReservation.js";

export class DeleteAllReservations implements IDeleteReservation {

    async execute(reservationId: string): Promise<IDeleteMessage> {
       
        try {
            
            await prisma.reservation.deleteMany()

            const message: IDeleteMessage =  {
                message: 'Reservada deletada com sucesso!'
            }            

            return message

        } catch (error) {
            
            throw new Error('internal server error' + error)

        }
    }
}