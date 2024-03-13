import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol.js";
import { getReservationByUserId } from "../../../adapters/ormAdapter/protocols/reservationProtocols.js";
import { IReservation, Reservation } from "../../../entities/Reservation.js";
import { GetReservationByUserIdUseCase } from "../../../usecases/reservation/GetReservationByUserIdUseCase.js";
import { IController } from "../IController.js";
import Formatter from "../utils/Formatter.js";
import ServerResponse from "../utils/ServerResponse.js";


class GetReservationByUserId implements IController {
    
    async handle(req: HttpRequest<{user_id: string}>, res: HttpResponse){

        const serverResponse = new ServerResponse(res)

        try {
        
            const userId = req.params.user_id
            const getReservationByUserIdUseCase = new GetReservationByUserIdUseCase(getReservationByUserId)

            const response= await getReservationByUserIdUseCase.execute(userId)

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

                case (response == "You have no reserves."):
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

const getReservationByUserIdController = new GetReservationByUserId()

export default getReservationByUserIdController