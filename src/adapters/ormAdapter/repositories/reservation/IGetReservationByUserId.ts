import { IReservation } from "../../../../entities/Reservation";


export interface IGetReservationByUserId {
    execute(userId: string): Promise<IReservation | IReservation[]>
}