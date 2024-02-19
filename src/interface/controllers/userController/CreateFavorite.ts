import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { createFavorite } from "../../../adapters/ormAdapter/protocols/favoriteProtocols";
import { FavoriteBookUseCase } from "../../../usecases/user/FavoriteBookUseCase";

interface IBody {

    userId: string;
    bookId: string;

}

export class CreateFavorite {


    async handle(req: HttpRequest<{}, {}, IBody>, res: HttpResponse) {

        const {
            bookId, 
            userId
        } = req.body;

        const createFavoriteUseCase = new FavoriteBookUseCase(createFavorite)

        return await createFavoriteUseCase.execute(userId, bookId)

    }

}

const createFavoriteController = new CreateFavorite()

export default createFavoriteController