import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { getReservationByUserId } from "../../../adapters/ormAdapter/protocols/reservationProtocols";
import { IReservation, Reservation } from "../../../entities/Reservation";
import { GetReservationByUserIdUseCase } from "../../../usecases/reservation/GetReservationByUserIdUseCase";
import { IController } from "../IController";
import Formatter from "../utils/Formatter";
import ServerResponse from "../utils/ServerResponse";


class GetReservationByUserId implements IController {

    async handle(req: HttpRequest<{ userId: string }>, res: HttpResponse) {

        const serverResponse = new ServerResponse(res)

        const userId = req.params.userId
        console.log(userId)
        const getReservationByUserIdUseCase = new GetReservationByUserIdUseCase(getReservationByUserId)

        const response = await getReservationByUserIdUseCase.execute(userId)
        console.log(response)
        let reservationList: Array<IReservation> = []

        if (response.length == 0) {
      
            return serverResponse.ok(response)
        }


        for (let reservation of response) {

            reservationList.push(
                Formatter.handle<Reservation>(reservation)
            )



            return serverResponse.ok(reservationList)
        }
    }
}

const getReservationByUserIdController = new GetReservationByUserId()

export default getReservationByUserIdController