import { Reservation } from "../../../../entities/Reservation.js";
import { IGetReservationByBookId } from "../../repositories/reservation/IGetReservationByBookId.js";
import { prisma } from "../db.js";
import handlePrismaError from "../util/handlePrismaError.js";

export class GetReservationByBookId implements IGetReservationByBookId {

    async execute(bookId: string) {

        try {

            const data = await prisma.reservation.findMany({
                where: {
                    fk_id_book: bookId
                },
                select: {
                    id: true,
                    fk_id_user: true,
                    fk_id_book: true,
                    price: true,
                    status: true,
                    createdAt: true
                }
            })

            if (data.length == 0) {
                const message = "This book has no reservations."
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