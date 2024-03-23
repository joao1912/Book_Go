import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { deleteUser } from "../../../adapters/ormAdapter/protocols/userProtocols";
import { DeleteUserUseCase } from "../../../usecases/user/DeleteUserUseCase";
import { IController } from "../IController";
import ServerResponse from "../utils/ServerResponse";


class DeleteUser implements IController {

    async handle(req: HttpRequest, res: HttpResponse) {

        const serverResponse = new ServerResponse(res)

        const userId = req.userId;

        const deleteUserUseCase = new DeleteUserUseCase(deleteUser)

        await deleteUserUseCase.execute(userId)
            .then(result => {

                return serverResponse.ok(result)

            })
    }
}

const deleteUserController = new DeleteUser()

export default deleteUserController