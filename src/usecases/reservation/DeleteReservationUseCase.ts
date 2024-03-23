import { IDeleteReservation } from "../../adapters/ormAdapter/repositories/reservation/IDeleteReservation";
import { validatorAdapter } from "../../adapters/validatorAdapter/protocol";


export class DeleteReservationUseCase {

    protected deleteReserveService: IDeleteReservation
    constructor(ormAdapter: IDeleteReservation){
        this.deleteReserveService = ormAdapter
    }

    async execute (reserveId: string | undefined) {

        const validatedId = validatorAdapter.validateId(reserveId)

        return await this.deleteReserveService.execute(validatedId)
    }
}
