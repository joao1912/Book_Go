import { ICreateFavorite, IFavoriteCreated } from "../../adapters/ormAdapter/repositories/favorite/ICreateFavorite";
import { Book } from "../../entities/Book";
import ServerResponse from "../../interface/controllers/utils/ServerResponse";


export class FavoriteBookUseCase {

    protected createFavoriteAdapter: ICreateFavorite
    constructor(ormAdapter: ICreateFavorite) {

        this.createFavoriteAdapter = ormAdapter

    }

    async execute(userId: string | undefined, bookId: string | undefined): Promise<IFavoriteCreated> {

        if (!userId || !bookId) ServerResponse.missingParameters('UserError', 'Missing parameters')

        const bookFavorited = await this.createFavoriteAdapter.execute(userId, bookId)

        return bookFavorited

    }

}