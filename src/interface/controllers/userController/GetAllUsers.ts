import { GetAllUsersUseCase } from "../../../usecases/user/GetAllUsersUseCase";
import { getAllUsers } from "../../../adapters/ormAdapter/protocols/userProtocols";
import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { IController } from "../IController";
import Formatter from "../utils/Formatter";
import { User } from "../../../entities/User";
import { IUser } from "../../../entities/User";

class GetAllUsers implements IController {

    async handle(req: HttpRequest, res: HttpResponse) {

        try {
            
            const getAllUsersUseCase = new GetAllUsersUseCase(getAllUsers)

            const allUsersInstances = await getAllUsersUseCase.execute()

            let usersList: Array<IUser> = []

            for(let user of allUsersInstances) {

                usersList.push(
                    Formatter.handle<User>(user)
                )

            }

            res.status(200).json(usersList)

        } catch (error) {

            throw new Error('Bad Request: ' + error)
            
        }

    }

}

const getAllUsersController = new GetAllUsers()

export default getAllUsersController