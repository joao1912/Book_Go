import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { getAllFavoritesByUserId } from "../../../adapters/ormAdapter/protocols/favoriteProtocols";
import { Book, IBook } from "../../../entities/Book";
import { GetMyFavoritesUseCase } from "../../../usecases/user/GetMyFavoritesUseCase";
import { IController } from "../IController";
import Formatter from "../utils/Formatter";

class GetMyFavorites implements IController {

    async handle(req: HttpRequest, res: HttpResponse) {

        const userId = req.userId

        if (!userId) throw new Error('Bad request: userId can not be undefined')

        const getMyFavoritesUseCase = new GetMyFavoritesUseCase(getAllFavoritesByUserId)

        const favoritesInstances = await getMyFavoritesUseCase.execute(userId)

        let favoriteList: Array<IBook> = []

        for (let book of favoritesInstances) {
            
            favoriteList.push(
                Formatter.handle<Book>(book)
            )

        }

        res.status(200).json(favoriteList)

    }

}

const getMyFavoritesController = new GetMyFavorites()

export default getMyFavoritesController