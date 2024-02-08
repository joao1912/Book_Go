import { Book, IBook } from "../../../../entities/Book"


export interface IAddBook {
    execute(book: Omit<Book, "id">): Promise<Book>
}

