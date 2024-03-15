import ServerResponse from "../utils/ServerResponse.js";
import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol.js";
import authJwt from "../../../adapters/authAdapter/jwtAdapter.js";
import { encryptorAdapter } from "../../../adapters/encryptorAdapter/protocol.js";
import { getUser } from "../../../adapters/ormAdapter/protocols/userProtocols.js";
import { GetUserUseCase } from "../../../usecases/user/GetUserUseCase.js";
import { IController } from "../IController.js";
import { User } from "../../../entities/User.js";
import { CustomError } from "../utils/CustomError.js";


class Login implements IController {

    async handle(req: HttpRequest<{}, {}, { email: string, password: string }>, res: HttpResponse): Promise<any> {
        const { email, password } = req.body

        const serverReponse = new ServerResponse(res)

        if (!email || !password) {
            let missingParam: string
            missingParam = (!email) ? "Enter your email " : ''
            missingParam = missingParam + ((!password) ? ("\n" + "Enter you password") : '')
           
            return serverReponse.missingParameters("userError", missingParam)
        }


            const getUserUseCase = new GetUserUseCase(getUser)

            const userInstance = await getUserUseCase.execute(email)


            if (userInstance instanceof User) {

                const dbHashPassword = userInstance.props.password

                const checkPassword = await encryptorAdapter.validatePassword(password, dbHashPassword)

                if (!checkPassword) {
                    return ServerResponse.notAuthorized("userError", "Invalid password")
                }

                if (userInstance.props.id) {
                    const userToken = authJwt.sign(userInstance.props.id)

                    return serverReponse.ok({ token: userToken })
                }
            }
            


       
    }
}

const loginController = new Login()

export default loginController