import ServerResponse from "../utils/ServerResponse";
import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import authJwt from "../../../adapters/authAdapter/jwtAdapter";
import { encryptorAdapter } from "../../../adapters/encryptorAdapter/protocol";
import { getUser } from "../../../adapters/ormAdapter/protocols/userProtocols";
import { GetUserUseCase } from "../../../usecases/user/GetUserUseCase";
import { IController } from "../IController";
import { User } from "../../../entities/User";


class Login implements IController {

    async handle(req: HttpRequest<{}, {}, { email: string, password: string }>, res: HttpResponse): Promise<any> {
        const { email, password } = req.body

        const serverReponse = new ServerResponse(res)

        const getUserUseCase = new GetUserUseCase(getUser)

        const userInstance = await getUserUseCase.execute(email)

        if (userInstance instanceof User) {

            const dbHashPassword = userInstance.props.password

            const checkPassword = await encryptorAdapter.validatePassword(password, dbHashPassword)
            console.log("Senha validacao = ",checkPassword)
            if (!checkPassword) {
                ServerResponse.forbidden("UserError", "Invalid password")
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