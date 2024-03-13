import { IGetReservationByBookId } from "../../adapters/ormAdapter/repositories/reservation/IGetReservationByBookId.js";


export class GetReservationByBookIdUseCase {
    protected reserveService: IGetReservationByBookId
    constructor(ormAdapater: IGetReservationByBookId){
        this.reserveService = ormAdapater
    }

    async execute(bookId: string){
        return await this.reserveService.execute(bookId)
    }
}