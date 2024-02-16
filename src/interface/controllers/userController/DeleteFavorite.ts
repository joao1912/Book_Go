import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { deleteFavorite } from "../../../adapters/ormAdapter/protocols/favoriteProtocols";
import { DeleteFavoriteByIdUseCase } from "../../../usecases/user/DeleteFavoriteByIdUseCase";


class DeleteFavorite {

    async handle(req: HttpRequest, res: HttpResponse) {

        const deleteFavoriteByIdUseCase = new DeleteFavoriteByIdUseCase(deleteFavorite)

        try {
            
            const {favoriteId} = req.params;

            await deleteFavoriteByIdUseCase.execute(favoriteId)
                .then(result => {

                    res.status(200).json(result)

                })

        } catch (error) {

            throw new Error('Bad Request: ' + error)
            
        }

    }

}

const deleteFavoriteController = new DeleteFavorite()

export default deleteFavoriteController