import { GetAllUsersUseCase } from "../../../usecases/user/GetAllUsersUseCase.js";
import { getAllUsers } from "../../../adapters/ormAdapter/protocols/userProtocols.js";
import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol.js";
import { IController } from "../IController.js";
import Formatter from "../utils/Formatter.js";
import { User } from "../../../entities/User.js";
import { IUser } from "../../../entities/User.js";
import ServerResponse from "../utils/ServerResponse.js";

class GetAllUsers implements IController {

    async handle(req: HttpRequest, res: HttpResponse) {

        const serverResponse = new ServerResponse(res)

        try {
            
            const getAllUsersUseCase = new GetAllUsersUseCase(getAllUsers)

            const allUsersInstances = await getAllUsersUseCase.execute()

            let usersList: Array<IUser> = []

            for(let user of allUsersInstances) {

                usersList.push(
                    Formatter.handle<User>(user)
                )

            }

            return serverResponse.ok(usersList)

        } catch (error) {

            throw new Error('Bad Request: ' + error)
            
        }

    }

}

const getAllUsersController = new GetAllUsers()

export default getAllUsersController