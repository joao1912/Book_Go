import { User } from "../../../entities/User";
import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import AuthJwt from "../../../adapters/authAdapter/jwtAdapter";
import { updateUser } from "../../../adapters/ormAdapter/protocols/userProtocols";
import { IUser } from "../../../entities/User";
import { UpdateUserUseCase } from "../../../usecases/user/UpdateUserUseCase";
import { IController } from "../IController";
import Formatter from "../utils/Formatter";

interface IBody extends IUser { }

class UpdateUser implements IController {
    async handle(req: HttpRequest<{ id: string }, {}, IBody>, res: HttpResponse) {
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

            res.status(200).json(
                Formatter.handle<User>(userInstance)
            )

        } catch (error) {
            throw new Error("Bad request: " + error)
        }
    }
}

const updateUserController = new UpdateUser()

export default updateUserController