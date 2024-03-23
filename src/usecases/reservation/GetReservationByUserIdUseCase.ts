import { IGetReservationByUserId } from "../../adapters/ormAdapter/repositories/reservation/IGetReservationByUserId";
import { validatorAdapter } from "../../adapters/validatorAdapter/protocol";


export class GetReservationByUserIdUseCase {

    protected getReservationByUserIdService: IGetReservationByUserId
    constructor(ormAdapter: IGetReservationByUserId){
        this.getReservationByUserIdService = ormAdapter
    }    
    async execute (userId: string | undefined){

        const validatedId = validatorAdapter.validateId(userId)

        return await this.getReservationByUserIdService.execute(validatedId)
    }

}
