import { Book } from "../../../../entities/Book";

export interface IFavoriteCreated {
    
    favoriteId: string;
    book: Book

}

export interface ICreateFavorite {

    execute(userId: string, bookId: string): Promise<IFavoriteCreated | void>

}