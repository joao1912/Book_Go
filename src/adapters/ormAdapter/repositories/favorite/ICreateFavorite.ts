import { Book } from "../../../../entities/Book";

export interface ICreateFavorite {

    execute(userId: string, bookId: string): Promise<Book>

}