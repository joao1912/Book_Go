import { Reservation } from "../../../../entities/Reservation";

export interface IGetReservationByBookId {
    execute(bookId: string): Promise <Reservation[] | string | void>
}