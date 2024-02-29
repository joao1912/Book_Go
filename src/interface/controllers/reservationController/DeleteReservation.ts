import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { deleteReservation } from "../../../adapters/ormAdapter/protocols/reservationProtocols";
import { DeleteReservationUseCase } from "../../../usecases/reservation/DeleteReservationUseCase";
import { IController } from "../IController";
import ServerResponse from "../utils/ServerResponse";


class DeleteReservation implements IController {

    async handle(req: HttpRequest<{id:string}>, res: HttpResponse){

        const serverResponse = new ServerResponse(res)

        try {
            const reservationId = req.params.id

            const deleteReservationUseCase = new DeleteReservationUseCase(deleteReservation)

            const message = await deleteReservationUseCase.execute(reservationId)

            return serverResponse.ok(message)



        } catch (error) {
            throw new Error("Bad request: "+ error)
        }
    }
}

const deleteReservationController = new DeleteReservation()

export default deleteReservationController