import { IReservation, Reservation } from "../../../../entities/Reservation";

export interface IGetAllReservation {
    execute(): Promise <Reservation[]>
}