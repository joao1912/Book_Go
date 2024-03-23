import { IMakeReservation } from "../../adapters/ormAdapter/repositories/reservation/IMakeReservation"
import { validatorAdapter } from "../../adapters/validatorAdapter/protocol"
import { SchemaKey } from "../../adapters/validatorAdapter/repository/IValidatorAdapterRepository"
import { IReservation, Reservation } from "../../entities/Reservation"


export class MakeReservationUseCase {

    protected makeReservationService: IMakeReservation
    constructor(ormAdapter: IMakeReservation){
        this.makeReservationService = ormAdapter

    }

    async execute (reservationData: IReservation){

        const validatedData = validatorAdapter.validateSchema<IReservation>(reservationData, SchemaKey.reservation)

        const reservationInstance = new Reservation(validatedData)
        
        return await this.makeReservationService.execute(reservationInstance)
    }

} 
