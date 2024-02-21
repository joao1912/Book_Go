import { GetAllUsersUseCase } from "../../../usecases/user/GetAllUsersUseCase";
import { getAllUsers } from "../../../adapters/ormAdapter/protocols/userProtocols";
import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { IController } from "../IController";

class GetAllUsers implements IController {

    async handle(req: HttpRequest, res: HttpResponse) {

        try {
            
            const getAllUsersUseCase = new GetAllUsersUseCase(getAllUsers)

            const allUsers = await getAllUsersUseCase.execute()

            res.status(200).json(allUsers)

        } catch (error) {

            throw new Error('Bad Request: ' + error)
            
        }

    }

}

const getAllUsersController = new GetAllUsers()

export default getAllUsersController