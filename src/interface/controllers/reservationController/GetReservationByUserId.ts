import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { getReservationByUserId } from "../../../adapters/ormAdapter/protocols/reservationProtocols";
import { GetReservationByUserIdUseCase } from "../../../usecases/reservation/GetReservationByUserIdUseCase";


class GetReservationByUserId {
    async handle(req: HttpRequest<{user_id: string}>, res: HttpResponse){
        try {
        
            const userId = req.params.user_id
            const getReservationByUserIdUseCase = new GetReservationByUserIdUseCase(getReservationByUserId)

            const reservationInstance = await getReservationByUserIdUseCase.execute(userId)

            res.status(200).json(reservationInstance)

        } catch (error) {
            throw new Error ("Bad request"+ error)
        }


    }
}

const getReservationByUserIdController = new GetReservationByUserId()

export default getReservationByUserIdController