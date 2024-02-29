import { encryptorAdapter } from "../../../adapters/encryptorAdapter/protocol";
import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { createUser } from "../../../adapters/ormAdapter/protocols/userProtocols";
import { IUser, User } from "../../../entities/User";
import { CreateUserUseCase } from "../../../usecases/user/CreateUserUseCase";
import { IController } from "../IController";
import Formatter from "../utils/Formatter";

interface IBody extends IUser {}

export class CreateUser implements IController {

    async handle(req: HttpRequest<{}, {}, IBody>, res: HttpResponse) {

        try {

            const {

                email,
                password,
                telephone,
                username,

            } = req.body
            
            const createUserUseCase = new CreateUserUseCase(createUser)

            const passwordHash = encryptorAdapter.hash(password)

            const userInstance = await createUserUseCase.execute({
                email,
                password: passwordHash,
                telephone,
                username,
            })

            res.status(200).json( 
                Formatter.handle<User>(userInstance)
            )

        } catch (error) {

            throw new Error('Bad Request: ' + error)
            
        }

    }

}

const createUserController = new CreateUser()

export default createUserController