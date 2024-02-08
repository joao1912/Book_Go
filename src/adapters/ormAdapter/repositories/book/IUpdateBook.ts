import {Book, IBook } from "../../../../entities/Book"

export interface IUpdateBook {
    execute(book: Partial<Book> ): Promise<Book>
}
