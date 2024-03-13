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
        try {
            const {userId, bookId} = req.params
     

            let reserve = {
                userId: userId,
                bookId: bookId,
                price: 20,
                status: "string"

            }

            const makeReservationUseCase = new MakeReservationUseCase(makeReservation)

            const response = await makeReservationUseCase.execute(reserve)

            switch (true) {
                case (response instanceof Reservation):
                    return serverResponse.ok(Formatter.handle<Reservation>(response))
                    break;

                case (response == "Invalid input type provided."):
                    return serverResponse.badRequest(response)
                    break;

                case (response == "Id provided does not exist."):
                    return serverResponse.notFound(response)
                    break;

                case (response == "Internal server error"):
                    return serverResponse.serverError(response)
                    break;
            }



        } catch (error) {
            console.log(error)
            throw new Error("Something happened. Please try again later")

        }

    }
}

const makeReservationController = new MakeReservation()

export default makeReservationController