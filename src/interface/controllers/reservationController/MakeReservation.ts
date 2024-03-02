import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { makeReservation } from "../../../adapters/ormAdapter/protocols/reservationProtocols";
import { Reservation } from "../../../entities/Reservation";
import { MakeReservationUseCase } from "../../../usecases/reservation/MakeReservationUseCase";
import { IController } from "../IController";
import Formatter from "../utils/Formatter";
import ServerResponse from "../utils/ServerResponse";


class MakeReservation implements IController {

    async handle(req: HttpRequest<{ user_id: string }, { bookId: string }>, res: HttpResponse) {

        const serverResponse = new ServerResponse(res)
        try {
            const user_id = req.params.user_id
            const book_id = req.body.bookId

            let reserve = {
                userId: user_id,
                bookId: book_id,
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