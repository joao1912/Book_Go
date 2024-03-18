import { ICreateFavorite, IFavoriteCreated } from "../../adapters/ormAdapter/repositories/favorite/ICreateFavorite";
import { validatorAdapter } from "../../adapters/validatorAdapter/protocol";
import { Book } from "../../entities/Book";
import ServerResponse from "../../interface/controllers/utils/ServerResponse";


export class FavoriteBookUseCase {

    protected createFavoriteAdapter: ICreateFavorite
    constructor(ormAdapter: ICreateFavorite) {

        this.createFavoriteAdapter = ormAdapter

    }

    async execute(userId: string | undefined, bookId: string | undefined): Promise<IFavoriteCreated> {

        const validatedUserId = validatorAdapter.validateId(userId) 
        const validatedBookId = validatorAdapter.validateId(bookId) 

        const bookFavorited = await this.createFavoriteAdapter.execute(validatedUserId, validatedBookId)

        return bookFavorited

    }

}