import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol.js";
import { makeReservation } from "../../../adapters/ormAdapter/protocols/reservationProtocols.js";
import { Reservation } from "../../../entities/Reservation.js";
import { MakeReservationUseCase } from "../../../usecases/reservation/MakeReservationUseCase.js";
import { IController } from "../IController.js";
import Formatter from "../utils/Formatter.js";
import ServerResponse from "../utils/ServerResponse.js";


class MakeReservation implements IController {

    async handle(req: HttpRequest<{ userId: string, bookId: string }>, res: HttpResponse) {

        const serverResponse = new ServerResponse(res)

        const { userId, bookId } = req.params


        let reserve = {
            userId: userId,
            bookId: bookId,
            price: 20,
            status: "string"

        }

        const makeReservationUseCase = new MakeReservationUseCase(makeReservation)

        const response = await makeReservationUseCase.execute(reserve)

        if (response instanceof Reservation)
            return serverResponse.ok(Formatter.handle<Reservation>(response))





    }
}

const makeReservationController = new MakeReservation()

export default makeReservationController