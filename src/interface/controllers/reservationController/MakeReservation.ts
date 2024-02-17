import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { makeReservation } from "../../../adapters/ormAdapter/protocols/reservationProtocols";
import { MakeReservationUseCase } from "../../../usecases/reservation/MakeReservationUseCase";


class MakeReservation {

    async handle(req: HttpRequest<{book_id:string, user_id: string}>,res: HttpResponse){
    
    try {
        const bookId = req.params.book_id
        const userId = req.params.user_id
        let reserve = {
            userId: userId,
            bookId: bookId,
            price: 20,
            status : "string"

        }

        const makeReservationUseCase = new MakeReservationUseCase(makeReservation)

        const reservationInstance = await makeReservationUseCase.execute(reserve)

        res.status(200).json(reservationInstance)
        
    } catch (error) {
        throw new Error ("Bad Request: " + error)
        
    }

    }
}

const makeReservationController = new MakeReservation()

export default makeReservationController