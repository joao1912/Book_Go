import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol"
import { getReservationByBookId } from "../../../adapters/ormAdapter/protocols/reservationProtocols"
import { GetReservationByBookIdUseCase } from "../../../usecases/reservation/GetReservationByBookIdUseCase"
import { IController } from "../IController"


class GetReservationByBookId implements IController {

    async handle(req: HttpRequest<{book_id: string}>, res: HttpResponse){

        try {
            const bookId = req.params.book_id

            const getReservationByUserIdUseCase = new GetReservationByBookIdUseCase(getReservationByBookId)

            const reservationInstance = await getReservationByUserIdUseCase.execute(bookId)

            res.status(200).json(reservationInstance)

        } catch (error) {
            
            throw new Error("Bad request: "+ error)
        }

    }
}









const getReservationByBookIdController = new GetReservationByBookId() 

export default getReservationByBookIdController