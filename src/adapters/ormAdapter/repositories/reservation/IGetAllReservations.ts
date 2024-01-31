import { IReservation } from "../../../../entities/Reservation";

export interface IGetAllReservation {
    execute(): Promise <IReservation | IReservation[]>
}