import { IReservation } from "../../../../entities/Reservation";

//Acho que nao faz sentido esse
export interface IGetReservationByBookId {
    execute(bookId: string): Promise <IReservation | IReservation[]>
}