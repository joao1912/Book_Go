import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import authJwt from "../../../adapters/authAdapter/jwtAdapter";
import { encryptorAdapter } from "../../../adapters/encryptorAdapter/protocol";
import { getUser } from "../../../adapters/ormAdapter/protocols/userProtocols";
import { GetUserUseCase } from "../../../usecases/user/GetUserUseCase";
import { IController } from "../IController";


class GetUser implements IController {

    async handle(req: HttpRequest<{}, {}, { email: string, password: string }>, res: HttpResponse): Promise<void> {

        const { email, password } = req.body
        let userId: string
        console.log("header", req.headers["authorization"])

        if (!email || !password) {
            let missingParam = (!email)? `Enter your email` : ''
            missingParam = missingParam + (!password)? `Enter you password`: ''
            res.status(422).json({ message: missingParam })
        }
      

        try {

            const getUserUseCase = new GetUserUseCase(getUser)

            const userInstance = await getUserUseCase.execute(email)

            if (typeof userInstance !== "string") {

                const dbHashPassword = userInstance.props.password

                const checkPassword = await encryptorAdapter.validadePassword(password, dbHashPassword)
                
                if (!checkPassword) {

                    res.status(403).json("Invalid password")
                }

                if (userInstance.props.id) {
                   
                    const userToken = authJwt.sign(userInstance.props.id)

                    res.status(200).json({TOKENZAO: userToken})
                }


            }


        } catch (error) {

            console.log(error)

            res.status(500).json({ message: "Servidor error" })
        }

    }
}

const getUserController = new GetUser()

export default getUserController