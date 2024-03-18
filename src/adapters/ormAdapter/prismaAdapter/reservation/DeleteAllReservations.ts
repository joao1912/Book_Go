import { prisma } from "../db";

import { IDeleteMessage, IDeleteReservation } from "../../repositories/reservation/IDeleteReservation";
import handlePrismaError from "../util/handlePrismaError";

export class DeleteAllReservations implements IDeleteReservation {

    async execute(): Promise<IDeleteMessage> {

        try {

            await prisma.reservation.deleteMany()

            const message: IDeleteMessage = {
                message: 'Reservation deleted successfully.'
            }

            return message

        } catch (error) {

            handlePrismaError ("ReservationError", error)
            throw error
        }
    }
}