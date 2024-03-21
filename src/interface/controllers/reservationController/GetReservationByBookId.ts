import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { getReservationByBookId } from "../../../adapters/ormAdapter/protocols/reservationProtocols";
import { IReservation, Reservation } from "../../../entities/Reservation";
import { GetReservationByBookIdUseCase } from "../../../usecases/reservation/GetReservationByBookIdUseCase";
import { IController } from "../IController";
import Formatter from "../utils/Formatter";
import ServerResponse from "../utils/ServerResponse";


class GetReservationByBookId implements IController {

    async handle(req: HttpRequest<{},{},{},{ bookId: string }>, res: HttpResponse) {

        const serverResponse = new ServerResponse(res)

        const bookId = req.query.bookId

        const getReservationByUserIdUseCase = new GetReservationByBookIdUseCase(getReservationByBookId)

        const response = await getReservationByUserIdUseCase.execute(bookId)

        let reservationList: Array<IReservation> = []

        if (response.length == 0) {

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