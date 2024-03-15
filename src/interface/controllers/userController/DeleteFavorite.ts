import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { deleteFavorite } from "../../../adapters/ormAdapter/protocols/favoriteProtocols";
import { DeleteFavoriteByIdUseCase } from "../../../usecases/user/DeleteFavoriteByIdUseCase";
import { IController } from "../IController";
import ServerResponse from "../utils/ServerResponse";


class DeleteFavorite implements IController {

    async handle(req: HttpRequest, res: HttpResponse) {

        const serverResponse = new ServerResponse(res)

        const deleteFavoriteByIdUseCase = new DeleteFavoriteByIdUseCase(deleteFavorite)

        try {
            
            const {favoriteId} = req.params;

            await deleteFavoriteByIdUseCase.execute(favoriteId)
                .then(result => {

                    return serverResponse.ok(result)

                })

        } catch (error) {

            throw new Error('Bad Request: ' + error)
            
        }

    }

}

const deleteFavoriteController = new DeleteFavorite()

export default deleteFavoriteController