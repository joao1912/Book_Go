import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { createFavorite } from "../../../adapters/ormAdapter/protocols/favoriteProtocols";
import { FavoriteBookUseCase } from "../../../usecases/user/FavoriteBookUseCase";
import { IController } from "../IController";
import ServerResponse from "../utils/ServerResponse";

interface IBody {

    userId: string;
    bookId: string;

}

export class CreateFavorite implements IController {


    async handle(req: HttpRequest<{}, {}, IBody>, res: HttpResponse) {

        const serverResponse = new ServerResponse(res)

        const {
            bookId, 
            userId
        } = req.body;

        const createFavoriteUseCase = new FavoriteBookUseCase(createFavorite)

        const favorite = await createFavoriteUseCase.execute(userId, bookId)

        return serverResponse.ok(favorite)

    }

}

const createFavoriteController = new CreateFavorite()

export default createFavoriteController