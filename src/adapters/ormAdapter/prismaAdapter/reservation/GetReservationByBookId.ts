import { Reservation } from "../../../../entities/Reservation";
import { IGetReservationByBookId } from "../../repositories/reservation/IGetReservationByBookId";
import { prisma } from "../db";
import handlePrismaError from "../util/handlePrismaError";

export class GetReservationByBookId implements IGetReservationByBookId {

    async execute(bookId: string): Promise<Reservation[]> {

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

            let dataArray: Reservation[] = []
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
            handlePrismaError("ReservationError", error)
            throw error
        }

    }

}