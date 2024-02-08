import { IReservation, Reservation } from "../../../../entities/Reservation"

export interface IMakeReservation {
    execute(reservation: Omit<Reservation, "id">): Promise<Reservation>
}