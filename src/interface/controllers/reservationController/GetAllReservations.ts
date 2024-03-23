import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { getAllReservations } from "../../../adapters/ormAdapter/protocols/reservationProtocols";
import { IReservation, Reservation } from "../../../entities/Reservation";
import { GetAllReservationsUseCase } from "../../../usecases/reservation/GetAllReservationsUseCase";
import { IController } from "../IController";
import Formatter from "../utils/Formatter";
import ServerResponse from "../utils/ServerResponse";

class GetAllReservations implements IController {

    async handle(__: HttpRequest, res: HttpResponse) {

        const serverResponse = new ServerResponse(res)

        const getAllReservationsUseCase = new GetAllReservationsUseCase(getAllReservations)

        const response = await getAllReservationsUseCase.execute()

        if (response.length == 0) {
            return serverResponse.ok(response)
        }

        let reservationList: Array<IReservation> = []

        for (let reservation of response) {

            reservationList.push(
                Formatter.handle<Reservation>(reservation)
            )

        }

        return serverResponse.ok(reservationList)

    }
}

const getAllReservationsController = new GetAllReservations()
export default getAllReservationsController;