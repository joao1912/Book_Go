import ServerResponse from "../utils/ServerResponse.js";
import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol.js";
import authJwt from "../../../adapters/authAdapter/jwtAdapter.js";
import { encryptorAdapter } from "../../../adapters/encryptorAdapter/protocol.js";
import { getUser } from "../../../adapters/ormAdapter/protocols/userProtocols.js";
import { GetUserUseCase } from "../../../usecases/user/GetUserUseCase.js";
import { IController } from "../IController.js";


class Login implements IController {

    async handle(req: HttpRequest<{}, {}, { email: string, password: string }>, res: HttpResponse): Promise<any> {
        const { email, password } = req.body
        const serverReponse = new ServerResponse(res)

        if (!email || !password) {
            let missingParam: string
            missingParam = (!email) ? "Enter your email " : ''
            missingParam = missingParam + ((!password) ? ("\n" + "Enter you password") : '')
           
            return serverReponse.badRequest({ message: missingParam })
        }


        try {

            const getUserUseCase = new GetUserUseCase(getUser)

            const userInstance = await getUserUseCase.execute(email)

           

            if (typeof userInstance !== "string") {

                const dbHashPassword = userInstance.props.password

                const checkPassword = await encryptorAdapter.validatePassword(password, dbHashPassword)

                if (!checkPassword) {
                    return serverReponse.notAuthorized("Invalid password")
                }

                if (userInstance.props.id) {
                    const userToken = authJwt.sign(userInstance.props.id)

                    return serverReponse.ok({ token: userToken })
                }
            }
            
            return serverReponse.notFound(userInstance)

        } catch (error) {

            console.log(error)
            throw new Error("Something happened. Please try again later")            
        }
    }
}

const loginController = new Login()

export default loginController