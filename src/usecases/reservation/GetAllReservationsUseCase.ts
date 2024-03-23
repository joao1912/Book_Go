import { IGetAllReservation } from "../../adapters/ormAdapter/repositories/reservation/IGetAllReservations"


export class GetAllReservationsUseCase {

    protected getAllReservationsService: IGetAllReservation
    constructor(ormAdapter: IGetAllReservation){
        this.getAllReservationsService = ormAdapter
    }

    async execute (){
        
        return await this.getAllReservationsService.execute()
       
    }

}
