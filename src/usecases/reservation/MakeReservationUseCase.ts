import { IMakeReservation } from "../../adapters/ormAdapter/repositories/reservation/IMakeReservation"
import { IReservation, Reservation } from "../../entities/Reservation"


export class MakeReservationUseCase {

    protected reservationService: IMakeReservation
    constructor(ormAdapter: IMakeReservation){
        this.reservationService = ormAdapter

    }

    async execute (reservationData: IReservation){
        const reservationInstance = new Reservation(reservationData)
        return await this.reservationService.execute(reservationInstance)
    }

} 