import { IAddBook } from "../../adapters/ormAdapter/repositories/book/IAddBook"
import { Book } from "../../entities/Book"


export class AddBook {

    protected bookService: IAddBook
    constructor(ormAdapter: IAddBook) {
        this.bookService = ormAdapter
    }

    async execute(bookData: Omit<Book, "id">) {

        const book = await this.bookService.execute(bookData)

    

    }

}
