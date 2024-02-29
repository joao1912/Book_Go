import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { makeReservation } from "../../../adapters/ormAdapter/protocols/reservationProtocols";
import { Reservation } from "../../../entities/Reservation";
import { MakeReservationUseCase } from "../../../usecases/reservation/MakeReservationUseCase";
import { IController } from "../IController";
import Formatter from "../utils/Formatter";
import ServerResponse from "../utils/ServerResponse";


class MakeReservation implements IController {

    async handle(req: HttpRequest<{book_id:string, user_id: string}>,res: HttpResponse){

        const serverResponse = new ServerResponse(res)
    
        try {
            const { book_id, user_id } = req.params;

            let reserve = {
                userId: user_id,
                bookId: book_id,
                price: 20,
                status : "string"

            }

            const makeReservationUseCase = new MakeReservationUseCase(makeReservation)

            const reservationInstance = await makeReservationUseCase.execute(reserve)

            return serverResponse.ok(
                Formatter.handle<Reservation>(reservationInstance)
            )
            
        } catch (error) {
            throw new Error ("Bad Request: " + error)
            
        }

    }
}

const makeReservationController = new MakeReservation()

export default makeReservationController