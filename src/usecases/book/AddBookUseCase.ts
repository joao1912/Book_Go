import { IAddBook } from "../../adapters/ormAdapter/repositories/book/IAddBook"
import { Book, IBook } from "../../entities/Book"


export class AddBookUseCase {

    protected bookService: IAddBook
    constructor(ormAdapter: IAddBook) {
        this.bookService = ormAdapter
    }

    async execute(bookData: Omit<Book, "id">) {

        return await this.bookService.execute(bookData)

    

    }

}
