import { IGetAllReservation } from "../../adapters/ormAdapter/repositories/reservation/IGetAllReservations"
import { IReservation } from "../../entities/Reservation"

export class GetAllReservationsUseCase{

    protected reservationService: IGetAllReservation
    constructor(ormAdapter: IGetAllReservation){
        this.reservationService = ormAdapter
    }

    async execute (){
        let result = await this.reservationService.execute()
        return result
    }


}