import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { makeReservation } from "../../../adapters/ormAdapter/protocols/reservationProtocols";
import { Reservation } from "../../../entities/Reservation";
import { MakeReservationUseCase } from "../../../usecases/reservation/MakeReservationUseCase";
import { IController } from "../IController";
import Formatter from "../utils/Formatter";
import ServerResponse from "../utils/ServerResponse";


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