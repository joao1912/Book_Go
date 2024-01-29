import { Book } from "../../../../entities/Book"

export interface IUpdateBook {
    execute(book: Partial<Book> ): Promise<Partial<Book>>
}
