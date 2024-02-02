import { IReservation, Reservation } from "../../../../entities/Reservation"

export interface IMakeReservation {
    execute(reservation: Omit<IReservation, "id">): Promise<Reservation>
}