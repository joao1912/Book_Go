import { GetAllUsersUseCase } from "../../../usecases/user/GetAllUsersUseCase";
import { getAllUsers } from "../../../adapters/ormAdapter/protocols/userProtocols";
import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { IController } from "../IController";
import Formatter from "../utils/Formatter";
import { User } from "../../../entities/User";
import { IUser } from "../../../entities/User";
import ServerResponse from "../utils/ServerResponse";


class GetAllUsers implements IController {

    async handle(__: HttpRequest, res: HttpResponse) {

        const serverResponse = new ServerResponse(res)

        const getAllUsersUseCase = new GetAllUsersUseCase(getAllUsers)

        const response = await getAllUsersUseCase.execute()

        let usersList: Array<IUser> = []

        for (let user of response) {

            usersList.push(
                Formatter.handle<User>(user)
            )

        }

        return serverResponse.ok(usersList)

    }
}

const getAllUsersController = new GetAllUsers()

export default getAllUsersController