import { GetAllUsersUseCase } from "../../../usecases/user/GetAllUsersUseCase";
import { getAllUsers } from "../../../adapters/ormAdapter/protocols/userProtocols";
import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { IController } from "../IController";
import Formatter from "../utils/Formatter";
import { User } from "../../../entities/User";
import { IUser } from "../../../entities/User";
import ServerResponse from "../utils/ServerResponse";

class GetAllUsers implements IController {

    async handle(req: HttpRequest, res: HttpResponse) {

        const serverResponse = new ServerResponse(res)

        try {
            
            const getAllUsersUseCase = new GetAllUsersUseCase(getAllUsers)

            const response = await getAllUsersUseCase.execute()

            let usersList: Array<IUser> = []
            if(response instanceof User && Array.isArray(response))
            for(let user of response) {

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