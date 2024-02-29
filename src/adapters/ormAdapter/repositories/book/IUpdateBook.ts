import {Book, IBook } from "../../../../entities/Book"

export interface IUpdateBook {
    execute(book: Book ): Promise<Book | string>
}
