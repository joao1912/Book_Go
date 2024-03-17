import ServerResponse from "../utils/ServerResponse";
import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import authJwt from "../../../adapters/authAdapter/jwtAdapter";
import { encryptorAdapter } from "../../../adapters/encryptorAdapter/protocol";
import { getUser } from "../../../adapters/ormAdapter/protocols/userProtocols";
import { GetUserUseCase } from "../../../usecases/user/GetUserUseCase";
import { IController } from "../IController";
import { User } from "../../../entities/User";
import { CustomError } from "../utils/CustomError";


class Login implements IController {

    async handle(req: HttpRequest<{}, {}, { email: string, password: string }>, res: HttpResponse): Promise<any> {
        const { email, password } = req.body

        const serverReponse = new ServerResponse(res)

<<<<<<< HEAD
        if (!email || !password) {
            let missingParam: string
            missingParam = (!email) ? "Enter your email " : ''
            missingParam = missingParam + ((!password) ? ("\n" + "Enter you password") : '')
           
            ServerResponse.missingParameters("userError", missingParam)
=======

        const getUserUseCase = new GetUserUseCase(getUser)

        const userInstance = await getUserUseCase.execute(email)


        if (userInstance instanceof User) {

            const dbHashPassword = userInstance.props.password

            const checkPassword = await encryptorAdapter.validatePassword(password, dbHashPassword)

            if (!checkPassword) {
                ServerResponse.notAuthorized("UserError", "Invalid password")
            }

            if (userInstance.props.id) {
                const userToken = authJwt.sign(userInstance.props.id)

                return serverReponse.ok({ token: userToken })
            }
>>>>>>> b080af50bd02fef5932c40ad42bc8a5cfefe41e9
        }




<<<<<<< HEAD
            if (userInstance instanceof User) {

                const dbHashPassword = userInstance.props.password

                const checkPassword = await encryptorAdapter.validatePassword(password, dbHashPassword)

                if (!checkPassword) {
                   ServerResponse.notAuthorized("userError", "Invalid password")
                }

                if (userInstance.props.id) {
                    const userToken = authJwt.sign(userInstance.props.id)

                    return serverReponse.ok({ token: userToken })
                }
            }
            


       
=======
>>>>>>> b080af50bd02fef5932c40ad42bc8a5cfefe41e9
    }
}

const loginController = new Login()

export default loginController