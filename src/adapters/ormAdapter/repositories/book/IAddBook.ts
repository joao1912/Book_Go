import { Book, IBook } from "../../../../entities/Book"


export interface IAddBook {
    execute(book: Omit<IBook, "id">): Promise<Book>
}

