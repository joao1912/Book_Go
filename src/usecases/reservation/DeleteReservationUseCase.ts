import { IDeleteReservation } from "../../adapters/ormAdapter/repositories/reservation/IDeleteReservation";
import { validatorAdapter } from "../../adapters/validatorAdapter/protocol";


export class DeleteReservationUseCase {

    protected reserveService: IDeleteReservation
    constructor(ormAdapter: IDeleteReservation){
        this.reserveService = ormAdapter
    }

    async execute (reserveId: string | undefined) {

        const validatedId = validatorAdapter.validateId(reserveId)

        return await this.reserveService.execute(validatedId)
    }
}