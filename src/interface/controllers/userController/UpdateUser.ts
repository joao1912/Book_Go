import { User } from "../../../entities/User.js";
import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol.js";
import AuthJwt from "../../../adapters/authAdapter/jwtAdapter.js";
import { updateUser } from "../../../adapters/ormAdapter/protocols/userProtocols.js";
import { IUser } from "../../../entities/User.js";
import { UpdateUserUseCase } from "../../../usecases/user/UpdateUserUseCase.js";
import { IController } from "../IController.js";
import Formatter from "../utils/Formatter.js";
import ServerResponse from "../utils/ServerResponse.js";

interface IBody extends IUser { }

class UpdateUser implements IController {
    
    async handle(req: HttpRequest<{ id: string }, {}, IBody>, res: HttpResponse) {

        // const serverResponse = new ServerResponse(res)

        const id = req.params.id
        
        const {
            email,
            password,
            telephone,
            username,
        } = req.body

        const updateUserUseCase = new UpdateUserUseCase(updateUser)

        try {

            const response = await updateUserUseCase.execute({
                id,
                email,
                password,
                telephone,
                username,
            })


            // switch (true) {
            //     case (response instanceof User):
            //         return serverResponse.ok(Formatter.handle<User>(response))
            //         break;

            //     case (response == "Invalid input type provided."):
            //         return serverResponse.badRequest(response)
            //         break;
            //     case (typeof response == "string" && response.includes("is already in use")):
            //         return serverResponse.conflict(response)
            //         break;

            //     case (response == "Internal server error"):
            //         return serverResponse.serverError(response)
            //         break;
            // }

        } catch (error) {
            
            console.log(error)
            throw new Error("Something happened. Please try again later")   
        }
    }
}

const updateUserController = new UpdateUser()

export default updateUserController