import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol.js";
import { getAllFavoritesByUserId } from "../../../adapters/ormAdapter/protocols/favoriteProtocols.js";
import { Book, IBook } from "../../../entities/Book.js";
import { GetMyFavoritesUseCase } from "../../../usecases/user/GetMyFavoritesUseCase.js";
import { IController } from "../IController.js";
import Formatter from "../utils/Formatter.js";
import ServerResponse from "../utils/ServerResponse.js";

class GetMyFavorites implements IController {

    async handle(req: HttpRequest, res: HttpResponse) {

        const serverResponse = new ServerResponse(res)

        const userId = req.userId

        if (!userId) {
            return serverResponse.badRequest('Bad request: userId can not be undefined')
        }

        const getMyFavoritesUseCase = new GetMyFavoritesUseCase(getAllFavoritesByUserId)

        const favoritesInstances = await getMyFavoritesUseCase.execute(userId)

        let favoriteList: Array<IBook> = []

        for (let book of favoritesInstances) {
            
            favoriteList.push(
                Formatter.handle<Book>(book)
            )

        }

        return serverResponse.ok(favoriteList)

    }

}

const getMyFavoritesController = new GetMyFavorites()

export default getMyFavoritesController