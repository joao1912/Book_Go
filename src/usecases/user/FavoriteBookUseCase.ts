import { ICreateFavorite } from "../../adapters/ormAdapter/repositories/favorite/ICreateFavorite";
import { Book } from "../../entities/Book";


export class FavoriteBookUseCase {

    protected createFavoriteAdapter: ICreateFavorite
    constructor(ormAdapter: ICreateFavorite) {

        this.createFavoriteAdapter = ormAdapter

    }

    async execute(userId: string, bookId: string): Promise<Book> {

        const bookFavorited = await this.createFavoriteAdapter.execute(userId, bookId)

        return bookFavorited

    }

}