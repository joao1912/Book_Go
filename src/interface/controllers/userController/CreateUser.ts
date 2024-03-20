import { authAdapter } from "../../../adapters/authAdapter/protocol";
import { encryptorAdapter } from "../../../adapters/encryptorAdapter/protocol";
import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { createUser } from "../../../adapters/ormAdapter/protocols/userProtocols";
import { IUser, User } from "../../../entities/User";
import { CreateUserUseCase } from "../../../usecases/user/CreateUserUseCase";
import { IController } from "../IController";
import Formatter from "../utils/Formatter";
import ServerResponse from "../utils/ServerResponse";

interface IBody extends IUser { }

export class CreateUser implements IController {

    async handle(req: HttpRequest<{}, {}, IBody>, res: HttpResponse) {

        const serverResponse = new ServerResponse(res)

        const {

            email,
            password,
            telephone,
            username,

        } = req.body

        const createUserUseCase = new CreateUserUseCase(createUser)

        // const passwordHash = encryptorAdapter.hash(password)

        const userInstance = await createUserUseCase.execute({
            email,
            password,
            telephone,
            username,
        })

        const userData = Formatter.handle<User>(userInstance)
        //@ts-ignore
        delete userData.password
    
        const token = authAdapter.sign(userData.id!)

        const response = {
            user: {
                ...userData
            },
          token: token
        }
        
        return serverResponse.ok(
            response
        )

    }

}

const createUserController = new CreateUser()

export default createUserController