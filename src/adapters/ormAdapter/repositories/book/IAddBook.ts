import { Book, IBook } from "../../../../entities/Book"


export interface IAddBook {
    execute(book: Book): Promise<Book>
}

