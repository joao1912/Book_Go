import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol"
import { getReservationByBookId } from "../../../adapters/ormAdapter/protocols/reservationProtocols"
import { IReservation, Reservation } from "../../../entities/Reservation"
import { GetReservationByBookIdUseCase } from "../../../usecases/reservation/GetReservationByBookIdUseCase"
import { IController } from "../IController"
import Formatter from "../utils/Formatter"
import ServerResponse from "../utils/ServerResponse"


class GetReservationByBookId implements IController {

    async handle(req: HttpRequest<{book_id: string}>, res: HttpResponse){

        const serverResponse = new ServerResponse(res)

        try {
            const bookId = req.params.book_id

            const getReservationByUserIdUseCase = new GetReservationByBookIdUseCase(getReservationByBookId)

            const reservationInstance = await getReservationByUserIdUseCase.execute(bookId)

            if (typeof reservationInstance === 'string') {

                return serverResponse.notAuthorized(reservationInstance)

            }

            let reservationList: Array<IReservation> = []

            for (let reservation of reservationInstance) {

                reservationList.push(
                    Formatter.handle<Reservation>(reservation)
                )

            }

            return serverResponse.ok(reservationList)

        } catch (error) {
            
            throw new Error("Bad request: "+ error)
        }

    }
}









const getReservationByBookIdController = new GetReservationByBookId() 

export default getReservationByBookIdController