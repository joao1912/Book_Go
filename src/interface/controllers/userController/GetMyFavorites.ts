import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { getAllFavoritesByUserId } from "../../../adapters/ormAdapter/protocols/favoriteProtocols";
import { GetMyFavoritesUseCase } from "../../../usecases/user/GetMyFavoritesUseCase";
import { IController } from "../IController";

class GetMyFavorites implements IController {

    async handle(req: HttpRequest, res: HttpResponse) {

        const userId = req.userId

        if (!userId) throw new Error('Bad request: userId can not be undefined')

        const getMyFavoritesUseCase = new GetMyFavoritesUseCase(getAllFavoritesByUserId)

        const favorites = await getMyFavoritesUseCase.execute(userId)

        res.status(200).json(favorites)

    }

}

const getMyFavoritesController = new GetMyFavorites()

export default getMyFavoritesController