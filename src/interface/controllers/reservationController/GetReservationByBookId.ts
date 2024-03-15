import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol.js";
import { getReservationByBookId } from "../../../adapters/ormAdapter/protocols/reservationProtocols.js";
import { IReservation, Reservation } from "../../../entities/Reservation.js";
import { GetReservationByBookIdUseCase } from "../../../usecases/reservation/GetReservationByBookIdUseCase.js";
import { IController } from "../IController.js";
import Formatter from "../utils/Formatter.js";
import ServerResponse from "../utils/ServerResponse.js";


class GetReservationByBookId implements IController {

    async handle(req: HttpRequest<{ bookId: string }>, res: HttpResponse) {

        const serverResponse = new ServerResponse(res)

        const bookId = req.params.bookId

        const getReservationByUserIdUseCase = new GetReservationByBookIdUseCase(getReservationByBookId)

        const response = await getReservationByUserIdUseCase.execute(bookId)


        let reservationList: Array<IReservation> = []

        

        if(typeof response == "string"){
            return serverResponse.ok(response)
        }

        if (response instanceof Reservation && Array.isArray(response)) {
            for (let reservation of response) {

                reservationList.push(
                    Formatter.handle<Reservation>(reservation)
                )

            }
            return serverResponse.ok(reservationList)
        }
    }
}


const getReservationByBookIdController = new GetReservationByBookId()

export default getReservationByBookIdController