import { IReservation } from "../../../../entities/Reservation"

export interface IMakeReservation {
    execute(reservation: Omit<IReservation, "id">): Promise<IReservation>
}