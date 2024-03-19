import { IGetReservationByUserId } from "../../adapters/ormAdapter/repositories/reservation/IGetReservationByUserId";
import { validatorAdapter } from "../../adapters/validatorAdapter/protocol";


export class GetReservationByUserIdUseCase {

    protected reserveService: IGetReservationByUserId
    constructor(ormAdapter: IGetReservationByUserId){
        this.reserveService = ormAdapter
    }    
    async execute (userId: string | undefined){

        const validatedId = validatorAdapter.validateId(userId)

        return await this.reserveService.execute(validatedId)
    }

} 