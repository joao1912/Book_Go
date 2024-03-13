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

        try {
            
            const getAllReservationsUseCase = new GetAllReservationsUseCase(getAllReservations)

            const response = await getAllReservationsUseCase.execute()

          
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
                
                case (response == "No reserves found."):
                    return serverResponse.ok(response)
                    break;
                case (response == "Internal server error"):
                    return serverResponse.serverError(response)
                    break;
            }


        } catch (error) {
            console.log(error)
            throw new Error("Something happened. Please try again later")          }
    }
}

const getAllReservationsController = new GetAllReservations()
export default getAllReservationsController