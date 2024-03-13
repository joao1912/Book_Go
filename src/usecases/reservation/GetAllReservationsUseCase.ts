import { IGetAllReservation } from "../../adapters/ormAdapter/repositories/reservation/IGetAllReservations.js"

export class GetAllReservationsUseCase {

    protected reservationService: IGetAllReservation
    constructor(ormAdapter: IGetAllReservation){
        this.reservationService = ormAdapter
    }

    async execute (){
        let result = await this.reservationService.execute()
        return result
    }

}