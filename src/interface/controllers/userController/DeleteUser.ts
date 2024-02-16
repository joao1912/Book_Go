import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { deleteUser } from "../../../adapters/ormAdapter/protocols/userProtocols";
import { DeleteUserUseCase } from "../../../usecases/user/DeleteUserUseCase";


class DeleteUser {

    async handle(req: HttpRequest, res: HttpResponse) {

        const userId = req.userId;

        if (!userId) throw new Error('BadRequest: userId can not be undefined.')

        try {
            
            const deleteUserUseCase = new DeleteUserUseCase(deleteUser)

            await deleteUserUseCase.execute(userId)
                .then(result => {

                    res.status(200).json(result)

                })

        } catch (error) {
            
            throw new Error('Bad Request: ' + error)

        }
            
    }

}

const deleteUserController = new DeleteUser()

export default deleteUserController