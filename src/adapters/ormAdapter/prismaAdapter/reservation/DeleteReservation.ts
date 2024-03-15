import { prisma } from "../db.js";

import { IDeleteMessage, IDeleteReservation } from "../../repositories/reservation/IDeleteReservation.js";
import handlePrismaError from "../util/handlePrismaError.js";

export class DeleteReservation implements IDeleteReservation {

    async execute(reservationId: string){

        try {

            await prisma.reservation.delete({
                where: {
                    id: reservationId
                }
            })

            const message: IDeleteMessage = {
                message: 'Reservation deleted successfully.'
            }

            return message

        } catch (error) {
            return handlePrismaError("userError", error)

        }
    }
}