import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { authJwt } from "../../../adapters/authAdapter/jwtAdapter";
import { updateUser } from "../../../adapters/ormAdapter/protocols/userProtocols";
import { IUser } from "../../../entities/User";
import { UpdateUserUseCase } from "../../../usecases/user/UpdateUserUseCase";

interface IBody extends IUser { }

class UpdateUser {
    async handle(req: HttpRequest<{ id: string }, {}, IBody>, res: HttpResponse) {
        const id = req.params.id
        
        const {
            email,
            password,
            telephone,
            username,
        } = req.body

        const updateUserUseCase = new UpdateUserUseCase(updateUser)


        const authorization = authJwt.checkToken(req.headers["authorization"])
        if (!authorization) {
            return res.status(403).json({ message: "Acess denied" })
        }

        try {

            const userInstance = await updateUserUseCase.execute({
                id,
                email,
                password,
                telephone,
                username,
            })

            res.status(200).json(userInstance)


        } catch (error) {
            throw new Error("Bad request: " + error)
        }
    }
}

const updateUserController = new UpdateUser()

export default updateUserController