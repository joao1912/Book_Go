import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { getAllReservations } from "../../../adapters/ormAdapter/protocols/reservationProtocols";
import { GetAllReservationsUseCase } from "../../../usecases/reservation/GetAllReservationsUseCase";
import { IController } from "../IController";

class GetAllReservations implements IController {

    async handle(req: HttpRequest, res: HttpResponse){

        try {
            
            const getAllReservationsUseCase = new GetAllReservationsUseCase(getAllReservations)

            const reservationInstance = await getAllReservationsUseCase.execute()

            res.status(200).json(reservationInstance)

        } catch (error) {
            throw new Error ("Bad request: "+ error)
        }
    }
}

const getAllReservationsController = new GetAllReservations()
export default getAllReservationsController