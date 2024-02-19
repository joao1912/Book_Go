import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { getAllFavoritesByUserId } from "../../../adapters/ormAdapter/protocols/favoriteProtocols";
import { GetMyFavoritesUseCase } from "../../../usecases/user/GetMyFavoritesUseCase";

class GetMyFavorites {

    async handle(req: HttpRequest, res: HttpResponse) {

        const userId = req.userId

        if (!userId) throw new Error('Bad request: userId can not be undefined')

        const getMyFavoritesUseCase = new GetMyFavoritesUseCase(getAllFavoritesByUserId)

        return await getMyFavoritesUseCase.execute(userId)

    }

}

const getMyFavoritesController = new GetMyFavorites()

export default getMyFavoritesController