import { authAdapter } from "../../../adapters/authAdapter/protocol.js";
import { encryptorAdapter } from "../../../adapters/encryptorAdapter/protocol.js";
import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol.js";
import { createUser } from "../../../adapters/ormAdapter/protocols/userProtocols.js";
import { IUser, User } from "../../../entities/User.js";
import { CreateUserUseCase } from "../../../usecases/user/CreateUserUseCase.js";
import { IController } from "../IController.js";
import Formatter from "../utils/Formatter.js";
import ServerResponse from "../utils/ServerResponse.js";

interface IBody extends IUser {}

export class CreateUser implements IController {

    async handle(req: HttpRequest<{}, {}, IBody>, res: HttpResponse) {

        const serverResponse = new ServerResponse(res)

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

            const userData: any = Formatter.handle<User>(userInstance)
            delete userData.password

            const token = authAdapter.sign(userData.id)

            const response = {
                user: {
                    ...userData
                },
                token: token
            }

            return serverResponse.ok( 
                response
            )

        } catch (error) {
            console.log(error)
            throw new Error("Something happened. Please try again later")
            
        }

    }

}

const createUserController = new CreateUser()

export default createUserController