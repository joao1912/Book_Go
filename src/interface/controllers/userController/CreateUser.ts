import { HashPassword } from "../../../adapters/encryptorAdapter/HashPassword";
import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { createUser } from "../../../adapters/ormAdapter/protocols/userProtocols";
import { IUser } from "../../../entities/User";
import { CreateUserUseCase } from "../../../usecases/user/CreateUserUseCase";
import { IController } from "../IController";

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

            const passwordHash = HashPassword.hash(password)

            const userInstance = await createUserUseCase.execute({
                email,
                password: passwordHash,
                telephone,
                username,
            })

            const newUser = userInstance.User

            res.status(200).json(newUser)

        } catch (error) {

            throw new Error('Bad Request: ' + error)
            
        }

    }

}

const createUserController = new CreateUser()

export default createUserController