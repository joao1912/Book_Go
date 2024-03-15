import { IReservation, Reservation } from "../../../../entities/Reservation"

export interface IMakeReservation {
    execute(reservation: Reservation): Promise<Reservation | void>
}