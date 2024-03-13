import { Reservation } from "../../../../entities/Reservation.js";
import { IGetReservationByUserId } from "../../repositories/reservation/IGetReservationByUserId.js";
import { prisma } from "../db.js";
import handlePrismaError from "../util/handlePrismaError.js";

export class GetReservationByUserId implements IGetReservationByUserId {

    async execute(userId: string) {

        try {

            const data = await prisma.reservation.findMany({
                where: {
                    fk_id_user: userId
                },
                select: {
                    id: true,
                    fk_id_user: true,
                    fk_id_book: true,
                    price: true,
                    createdAt: true,
                    status: true

                }
            })

            if (data.length == 0) {
                const message = "You have no reserves."
                return message
            }


            let dataArray = []
            for (let props of data) {

                dataArray.push(new Reservation
                    ({
                        id: props.id,
                        bookId: props.fk_id_book,
                        userId: props.fk_id_user,
                        price: props.price,
                        status: props.status,
                        startedAt: props.createdAt
                    })
                )

            }

            return dataArray

        } catch (error) {
            return handlePrismaError(error)
        }

    }

}