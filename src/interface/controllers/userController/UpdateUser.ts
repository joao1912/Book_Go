import { User } from "../../../entities/User.js";
import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol.js";
import AuthJwt from "../../../adapters/authAdapter/jwtAdapter.js";
import { updateUser } from "../../../adapters/ormAdapter/protocols/userProtocols.js";
import { IUser } from "../../../entities/User.js";
import { UpdateUserUseCase } from "../../../usecases/user/UpdateUserUseCase.js";
import { IController } from "../IController.js";
import Formatter from "../utils/Formatter.js";
import ServerResponse from "../utils/ServerResponse.js";

interface IBody extends IUser { }

class UpdateUser implements IController {
    
    async handle(req: HttpRequest<{ id: string }, {}, IBody>, res: HttpResponse) {

        const serverResponse = new ServerResponse(res)

        const id = req.params.id
        
        const {
            email,
            password,
            telephone,
            username,
        } = req.body

        const updateUserUseCase = new UpdateUserUseCase(updateUser)

        try {

            const userInstance = await updateUserUseCase.execute({
                id,
                email,
                password,
                telephone,
                username,
            })

            return serverResponse.ok(
                Formatter.handle<User>(userInstance)
            )

        } catch (error) {
            throw new Error("Bad request: " + error)
        }
    }
}

const updateUserController = new UpdateUser()

export default updateUserController