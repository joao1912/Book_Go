import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { getReservationByUserId } from "../../../adapters/ormAdapter/protocols/reservationProtocols";
import { IReservation, Reservation } from "../../../entities/Reservation";
import { GetReservationByUserIdUseCase } from "../../../usecases/reservation/GetReservationByUserIdUseCase";
import { IController } from "../IController";
import Formatter from "../utils/Formatter";


class GetReservationByUserId implements IController {
    
    async handle(req: HttpRequest<{user_id: string}>, res: HttpResponse){
        try {
        
            const userId = req.params.user_id
            const getReservationByUserIdUseCase = new GetReservationByUserIdUseCase(getReservationByUserId)

            const reservationInstance = await getReservationByUserIdUseCase.execute(userId)

            if (typeof reservationInstance === 'string') {

                return res.status(401).json(reservationInstance)

            }

            let reservationList: Array<IReservation> = []

            for (let reservation of reservationInstance) {

                reservationList.push(
                    Formatter.handle<Reservation>(reservation)
                )

            }

            res.status(200).json(reservationList)


        } catch (error) {
            throw new Error ("Bad request"+ error)
        }


    }
}

const getReservationByUserIdController = new GetReservationByUserId()

export default getReservationByUserIdController