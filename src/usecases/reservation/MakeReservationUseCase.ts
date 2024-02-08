import { IMakeReservation } from "../../adapters/ormAdapter/repositories/reservation/IMakeReservation"
import { Reservation } from "../../entities/Reservation"


export class MakeReservationUseCase {

    protected reservationService: IMakeReservation
    constructor(ormAdapter: IMakeReservation){
        this.reservationService = ormAdapter

    }

    async execute (reservationData: Omit<Reservation, "id">){
        return await this.reservationService.execute(reservationData)
    }

} 