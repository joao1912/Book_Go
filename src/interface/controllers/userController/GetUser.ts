import ServerResponse from "../utils/ServerResponse";
import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import authJwt from "../../../adapters/authAdapter/jwtAdapter";
import { encryptorAdapter } from "../../../adapters/encryptorAdapter/protocol";
import { getUser } from "../../../adapters/ormAdapter/protocols/userProtocols";
import { GetUserUseCase } from "../../../usecases/user/GetUserUseCase";
import { IController } from "../IController";


class GetUser implements IController {

    async handle(req: HttpRequest<{}, {}, { email: string, password: string }>, res: HttpResponse): Promise<any> {
        const { email, password } = req.body
        let userId: string
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

                const checkPassword = await encryptorAdapter.validadePassword(password, dbHashPassword)

                if (!checkPassword) {
                    return serverReponse.notAuthorized("Invalid password")
                }

                if (userInstance.props.id) {

                    const userToken = authJwt.sign(userInstance.props.id)

                    return serverReponse.ok({ token: userToken })
                }
            }
            
            console.log("console", userInstance)
            return serverReponse.notFound(userInstance)


        } catch (error) {

            console.log("aaaaa", error)

            return serverReponse.serverError({ message: "Internal server error. Cannot login right now." })
        }
    }
}

const getUserController = new GetUser()

export default getUserController