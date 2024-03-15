import { prisma } from "../db.js";

import { IDeleteMessage, IDeleteReservation } from "../../repositories/reservation/IDeleteReservation.js";

export class DeleteAllReservations implements IDeleteReservation {

    async execute(reservationId: string): Promise<IDeleteMessage> {

        try {

            await prisma.reservation.deleteMany()

            const message: IDeleteMessage = {
                message: 'Reservation deleted successfully.'
            }

            return message

        } catch (error) {

            throw new Error('internal server error' + error)

        }
    }
}