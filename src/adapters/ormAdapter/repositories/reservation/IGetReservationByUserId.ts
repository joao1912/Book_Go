import { Reservation } from "../../../../entities/Reservation";


export interface IGetReservationByUserId {
    execute(userId: string): Promise<Reservation | Reservation[]>
}