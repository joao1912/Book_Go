import { IGetReservationByUserId } from "../../adapters/ormAdapter/repositories/reservation/IGetReservationByUserId.js";


export class GetReservationByUserIdUseCase {

    protected reserveService: IGetReservationByUserId
    constructor(ormAdapter: IGetReservationByUserId){
        this.reserveService = ormAdapter
    }    
    async execute (userId: string){
        return await this.reserveService.execute(userId)
    }

} 