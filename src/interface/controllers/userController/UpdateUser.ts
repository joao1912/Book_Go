import { User } from "../../../entities/User";
import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import AuthJwt from "../../../adapters/authAdapter/jwtAdapter";
import { updateUser } from "../../../adapters/ormAdapter/protocols/userProtocols";
import { IUser } from "../../../entities/User";
import { UpdateUserUseCase } from "../../../usecases/user/UpdateUserUseCase";
import { IController } from "../IController";
import Formatter from "../utils/Formatter";
import ServerResponse from "../utils/ServerResponse";

interface IBody extends Partial<IUser> { }

class UpdateUser implements IController {
    
    async handle(req: HttpRequest<{}, {}, IBody>, res: HttpResponse) {

        const serverResponse = new ServerResponse(res)

        const id = req.userId
        const data = req.body

        const updateUserUseCase = new UpdateUserUseCase(updateUser)

            const response = await updateUserUseCase.execute({
                id: id,
                ...data
            })

            const user: IUser = Formatter.handle<User>(response)
            //@ts-ignore
            delete user.password
            
            serverResponse.ok(user)
    
    }
}

const updateUserController = new UpdateUser()

export default updateUserController