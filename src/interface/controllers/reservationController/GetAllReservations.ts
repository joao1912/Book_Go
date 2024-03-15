import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol.js";
import { getAllReservations } from "../../../adapters/ormAdapter/protocols/reservationProtocols.js";
import { IReservation, Reservation } from "../../../entities/Reservation.js";
import { GetAllReservationsUseCase } from "../../../usecases/reservation/GetAllReservationsUseCase.js";
import { IController } from "../IController.js";
import Formatter from "../utils/Formatter.js";
import ServerResponse from "../utils/ServerResponse.js";

class GetAllReservations implements IController {

    async handle(req: HttpRequest, res: HttpResponse){

        const serverResponse = new ServerResponse(res)


            const getAllReservationsUseCase = new GetAllReservationsUseCase(getAllReservations)

            const response = await getAllReservationsUseCase.execute()

            if(typeof response == "string")
            return serverResponse.ok(response)
          
        let reservationList: Array<IReservation> = []
        
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

const getAllReservationsController = new GetAllReservations()
export default getAllReservationsController;