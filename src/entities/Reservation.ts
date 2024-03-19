
import { ZodType, z } from "zod"



export interface IReservation {
    id?: string;
    userId: string;
    bookId: string;
    price: number;
    status : string
    startedAt? : Date
    endsAt? : Date
}

export const reservationSchema = z.object({
    id: z.string().uuid().optional(),
    userId: z.string().uuid(),
    bookId: z.string().uuid(),
    price: z.number(),
    status: z.string(),
    startedAt: z.date().optional(),
    endsAt: z.date().optional()
}) satisfies ZodType<IReservation>

export class Reservation {
    readonly props: IReservation

    constructor(props: IReservation) {
        const {id, userId, bookId, price} = props

        this.props = props
    }
     
}