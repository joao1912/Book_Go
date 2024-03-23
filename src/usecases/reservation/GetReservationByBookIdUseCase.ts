import { IGetReservationByBookId } from "../../adapters/ormAdapter/repositories/reservation/IGetReservationByBookId";
import { validatorAdapter } from "../../adapters/validatorAdapter/protocol";


export class GetReservationByBookIdUseCase {

    protected getReservationByBookIdService: IGetReservationByBookId

    constructor(ormAdapater: IGetReservationByBookId){

        this.getReservationByBookIdService = ormAdapater

    }

    async execute(bookId: string | undefined){

        const validatedId = validatorAdapter.validateId(bookId)

        return await this.getReservationByBookIdService.execute(validatedId)
    }
}