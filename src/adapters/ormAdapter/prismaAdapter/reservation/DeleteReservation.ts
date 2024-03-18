import { prisma } from "../db";

import { IDeleteMessage, IDeleteReservation } from "../../repositories/reservation/IDeleteReservation";
import handlePrismaError from "../util/handlePrismaError";

export class DeleteReservation implements IDeleteReservation {
    //@ts-ignore
    async execute(reservationId: string): Promise<IDeleteMessage> {

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
            
            handlePrismaError("ReservationError", error)
        }
    }
}