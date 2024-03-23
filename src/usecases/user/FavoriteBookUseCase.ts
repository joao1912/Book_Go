import { ICreateFavorite, IFavoriteCreated } from "../../adapters/ormAdapter/repositories/favorite/ICreateFavorite";
import { validatorAdapter } from "../../adapters/validatorAdapter/protocol";


export class FavoriteBookUseCase {

    protected createFavoriteService: ICreateFavorite

    constructor(ormAdapter: ICreateFavorite) {

        this.createFavoriteService = ormAdapter

    }

    async execute(userId: string | undefined, bookId: string | undefined): Promise<IFavoriteCreated> {

        const validatedUserId = validatorAdapter.validateId(userId) 
        const validatedBookId = validatorAdapter.validateId(bookId) 

        const bookFavorited = await this.createFavoriteService.execute(validatedUserId, validatedBookId)

        return bookFavorited

    }

}
