import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { deleteReservation } from "../../../adapters/ormAdapter/protocols/reservationProtocols";
import { DeleteReservationUseCase } from "../../../usecases/reservation/DeleteReservationUseCase";
import { IController } from "../IController";
import ServerResponse from "../utils/ServerResponse";


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