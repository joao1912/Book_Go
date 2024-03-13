import { IAddBook } from "../../adapters/ormAdapter/repositories/book/IAddBook.js"
import { Book, IBook } from "../../entities/Book.js"


export class AddBookUseCase {

    protected bookService: IAddBook
    constructor(ormAdapter: IAddBook) {
        this.bookService = ormAdapter
    }

    async execute(bookData: IBook) {

        const bookInstance = new Book(bookData)

        return await this.bookService.execute(bookInstance)

    

    }

}
