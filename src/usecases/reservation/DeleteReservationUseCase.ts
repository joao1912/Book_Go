import { IDeleteReservation } from "../../adapters/ormAdapter/repositories/reservation/IDeleteReservation";


export class DeleteReservationUseCase {

    protected reserveService: IDeleteReservation
    constructor(ormAdapter: IDeleteReservation){
        this.reserveService = ormAdapter
    }

    async execute (reserveId: string) {
        return await this.reserveService.execute(reserveId)
    }
}