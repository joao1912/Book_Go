import { IReservation } from "../../../../entities/Reservation";

export interface IGetReservationByBookId {
    execute(bookId: string): Promise <IReservation | IReservation[]>
}