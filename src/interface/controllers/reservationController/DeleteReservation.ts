import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { deleteReservation } from "../../../adapters/ormAdapter/protocols/reservationProtocols";
import { DeleteReservationUseCase } from "../../../usecases/reservation/DeleteReservationUseCase";
import { IController } from "../IController";


class DeleteReservation implements IController {

    async handle(req: HttpRequest<{id:string}>, res: HttpResponse){

        try {
            const reservationId = req.params.id

            const deleteReservationUseCase = new DeleteReservationUseCase(deleteReservation)

            const message = await deleteReservationUseCase.execute(reservationId)

            res.status(200).json(message)



        } catch (error) {
            throw new Error("Bad request: "+ error)
        }
    }
}

const deleteReservationController = new DeleteReservation()

export default deleteReservationController