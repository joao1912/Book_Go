import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { deleteReservation } from "../../../adapters/ormAdapter/protocols/reservationProtocols";
import { DeleteReservationUseCase } from "../../../usecases/reservation/DeleteReservationUseCase";
import { IController } from "../IController";
import ServerResponse from "../utils/ServerResponse";


class DeleteReservation implements IController {

    async handle(req: HttpRequest<{reservationId:string}>, res: HttpResponse){

        const serverResponse = new ServerResponse(res)

        try {
            const reservationId = req.params.reservationId

            const deleteReservationUseCase = new DeleteReservationUseCase(deleteReservation)

            const response = await deleteReservationUseCase.execute(reservationId)

            switch (true) {

                case (response.message == "Id provided does not exist."):
                    return serverResponse.notFound(response)
                    break;

                case (response.message == "Internal server error"):
                    return serverResponse.serverError(response)
                    break;
            }

            return serverResponse.ok(response)



        } catch (error) {
            console.log(error)
            throw new Error("Something happened. Please try again later")  
        }
    }
}

const deleteReservationController = new DeleteReservation()

export default deleteReservationController