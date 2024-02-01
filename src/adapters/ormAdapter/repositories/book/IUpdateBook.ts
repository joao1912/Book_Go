import {Book, IBook } from "../../../../entities/Book"

export interface IUpdateBook {
    execute(book: Partial<IBook> ): Promise<Book>
}
