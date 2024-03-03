import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { getReservationByUserId } from "../../../adapters/ormAdapter/protocols/reservationProtocols";
import { IReservation, Reservation } from "../../../entities/Reservation";
import { GetReservationByUserIdUseCase } from "../../../usecases/reservation/GetReservationByUserIdUseCase";
import { IController } from "../IController";
import Formatter from "../utils/Formatter";
import ServerResponse from "../utils/ServerResponse";


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
                    return serverResponse.badRequest(response)
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