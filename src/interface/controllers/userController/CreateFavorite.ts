import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { createFavorite } from "../../../adapters/ormAdapter/protocols/favoriteProtocols";
import { FavoriteBookUseCase } from "../../../usecases/user/FavoriteBookUseCase";
import { IController } from "../IController";

interface IBody {

    userId: string;
    bookId: string;

}

export class CreateFavorite implements IController {


    async handle(req: HttpRequest<{}, {}, IBody>, res: HttpResponse) {

        const {
            bookId, 
            userId
        } = req.body;

        const createFavoriteUseCase = new FavoriteBookUseCase(createFavorite)

        const favorite = await createFavoriteUseCase.execute(userId, bookId)

        res.status(200).json(favorite)

    }

}

const createFavoriteController = new CreateFavorite()

export default createFavoriteController