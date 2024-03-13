import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol.js";
import { deleteUser } from "../../../adapters/ormAdapter/protocols/userProtocols.js";
import { DeleteUserUseCase } from "../../../usecases/user/DeleteUserUseCase.js";
import { IController } from "../IController.js";
import ServerResponse from "../utils/ServerResponse.js";


class DeleteUser implements IController {

    async handle(req: HttpRequest, res: HttpResponse) {

        const serverResponse = new ServerResponse(res)

        const userId = req.userId;

        if (!userId) {
            return serverResponse.badRequest('BadRequest: userId can not be undefined.')
        }

        try {
            
            const deleteUserUseCase = new DeleteUserUseCase(deleteUser)

            await deleteUserUseCase.execute(userId)
                .then(result => {

                    return serverResponse.ok(result)

                })

        } catch (error) {
            
            throw new Error('Bad Request: ' + error)

        }
            
    }

}

const deleteUserController = new DeleteUser()

export default deleteUserController