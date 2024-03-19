import { IGetReservationByBookId } from "../../adapters/ormAdapter/repositories/reservation/IGetReservationByBookId";
import { validatorAdapter } from "../../adapters/validatorAdapter/protocol";


export class GetReservationByBookIdUseCase {
    protected reserveService: IGetReservationByBookId
    constructor(ormAdapater: IGetReservationByBookId){
        this.reserveService = ormAdapater
    }

    async execute(bookId: string | undefined){

        const validatedId = validatorAdapter.validateId(bookId)

        return await this.reserveService.execute(validatedId)
    }
}