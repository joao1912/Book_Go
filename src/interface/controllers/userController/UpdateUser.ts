import { User } from "../../../entities/User";
import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import AuthJwt from "../../../adapters/authAdapter/jwtAdapter";
import { updateUser } from "../../../adapters/ormAdapter/protocols/userProtocols";
import { IUser } from "../../../entities/User";
import { UpdateUserUseCase } from "../../../usecases/user/UpdateUserUseCase";
import { IController } from "../IController";
import Formatter from "../utils/Formatter";
import ServerResponse from "../utils/ServerResponse";

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

            const response = await updateUserUseCase.execute({
                id,
                email,
                password,
                telephone,
                username,
            })


        if (response instanceof User) 
            serverResponse.ok(Formatter.handle<User>(response))
    
    }
}

const updateUserController = new UpdateUser()

export default updateUserController