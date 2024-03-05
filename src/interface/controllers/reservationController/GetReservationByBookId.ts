import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol"
import { getReservationByBookId } from "../../../adapters/ormAdapter/protocols/reservationProtocols"
import { IReservation, Reservation } from "../../../entities/Reservation"
import { GetReservationByBookIdUseCase } from "../../../usecases/reservation/GetReservationByBookIdUseCase"
import { IController } from "../IController"
import Formatter from "../utils/Formatter"
import ServerResponse from "../utils/ServerResponse"


class GetReservationByBookId implements IController {

    async handle(req: HttpRequest<{bookId: string}>, res: HttpResponse){

        const serverResponse = new ServerResponse(res)

        try {
            const bookId = req.params.bookId

            const getReservationByUserIdUseCase = new GetReservationByBookIdUseCase(getReservationByBookId)

            const response = await getReservationByUserIdUseCase.execute(bookId)

         
            if (typeof response !== 'string') {
                let reservationList: Array<IReservation> = []

                for (let reservation of response) {
    
                    reservationList.push(
                        Formatter.handle<Reservation>(reservation)
                    )
    
                }
    
                return serverResponse.ok(reservationList)    
            }
            switch (true) {

                case (response == "This book has no reservations."):
                    return serverResponse.ok(response)
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









const getReservationByBookIdController = new GetReservationByBookId() 

export default getReservationByBookIdController