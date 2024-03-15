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
     
            const userId = req.params.user_id
            const getReservationByUserIdUseCase = new GetReservationByUserIdUseCase(getReservationByUserId)

            const response= await getReservationByUserIdUseCase.execute(userId)

            let reservationList: Array<IReservation> = []
            
            if(typeof response == "string"){
                return serverResponse.ok(response)
            }

            if (response instanceof Reservation && Array.isArray(response)){
                for (let reservation of response) {
    
                    reservationList.push(
                        Formatter.handle<Reservation>(reservation)
                    )
    
                }
    
                return serverResponse.ok(reservationList)    
            }
           

       


    }
}

const getReservationByUserIdController = new GetReservationByUserId()

export default getReservationByUserIdController