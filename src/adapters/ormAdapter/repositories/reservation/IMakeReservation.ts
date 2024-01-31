import { IReservation } from "../../../../entities/Reservation"

export interface MakeReservation {
    execute(reservation: IReservation): Promise<IReservation>
}