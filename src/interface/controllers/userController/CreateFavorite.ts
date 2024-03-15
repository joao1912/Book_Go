import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { createFavorite } from "../../../adapters/ormAdapter/protocols/favoriteProtocols";
import { Book } from "../../../entities/Book";
import { FavoriteBookUseCase } from "../../../usecases/user/FavoriteBookUseCase";
import { IController } from "../IController";
import Formatter from "../utils/Formatter";
import ServerResponse from "../utils/ServerResponse";

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