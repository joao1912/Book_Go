import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol.js";
import { createFavorite } from "../../../adapters/ormAdapter/protocols/favoriteProtocols.js";
import { Book } from "../../../entities/Book.js";
import { FavoriteBookUseCase } from "../../../usecases/user/FavoriteBookUseCase.js";
import { IController } from "../IController.js";
import Formatter from "../utils/Formatter.js";
import ServerResponse from "../utils/ServerResponse.js";

export class CreateFavorite implements IController {


    async handle(req: HttpRequest<{bookId: string}>, res: HttpResponse) {

        const serverResponse = new ServerResponse(res)

        const userId = req.userId;
        const { bookId } = req.params;

        if (typeof userId != 'string') {

            return serverResponse.badRequest('can not read the token')

        }

        const createFavoriteUseCase = new FavoriteBookUseCase(createFavorite)

        const favorite = await createFavoriteUseCase.execute(userId, bookId)

        const book = Formatter.handle<Book>(favorite.book)

        return serverResponse.ok({
            book,
            favoriteId: favorite.favoriteId
        })

    }

}

const createFavoriteController = new CreateFavorite()

export default createFavoriteController