import { IAddBook } from "../../adapters/ormAdapter/repositories/book/IAddBook"
import { IBook } from "../../entities/Book"


export class AddBook {

    protected bookService: IAddBook
    constructor(ormAdapter: IAddBook) {
        this.bookService = ormAdapter
    }

    async execute(bookData: Omit<IBook, "id">) {

        const book = await this.bookService.execute(bookData)

    

    }

}
