import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { getAllReservations } from "../../../adapters/ormAdapter/protocols/reservationProtocols";
import { IReservation, Reservation } from "../../../entities/Reservation";
import { GetAllReservationsUseCase } from "../../../usecases/reservation/GetAllReservationsUseCase";
import { IController } from "../IController";
import Formatter from "../utils/Formatter";

class GetAllReservations implements IController {

    async handle(req: HttpRequest, res: HttpResponse){

        try {
            
            const getAllReservationsUseCase = new GetAllReservationsUseCase(getAllReservations)

            const reservationInstance = await getAllReservationsUseCase.execute()

            let reservationList: Array<IReservation> = []

            for (let reservation of reservationInstance) {

                reservationList.push(
                    Formatter.handle<Reservation>(reservation)
                )

            }

            res.status(200).json(reservationList)

        } catch (error) {
            throw new Error ("Bad request: "+ error)
        }
    }
}

const getAllReservationsController = new GetAllReservations()
export default getAllReservationsController