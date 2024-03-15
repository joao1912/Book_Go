import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol.js";
import { deleteReservation } from "../../../adapters/ormAdapter/protocols/reservationProtocols.js";
import { DeleteReservationUseCase } from "../../../usecases/reservation/DeleteReservationUseCase.js";
import { IController } from "../IController.js";
import ServerResponse from "../utils/ServerResponse.js";


class DeleteReservation implements IController {

    async handle(req: HttpRequest<{reservationId:string}>, res: HttpResponse){

        const serverResponse = new ServerResponse(res)

            const reservationId = req.params.reservationId

            const deleteReservationUseCase = new DeleteReservationUseCase(deleteReservation)

            const response = await deleteReservationUseCase.execute(reservationId)

            return serverResponse.ok(response)

    }
}

const deleteReservationController = new DeleteReservation()

export default deleteReservationController