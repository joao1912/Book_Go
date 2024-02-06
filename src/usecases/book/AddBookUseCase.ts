import { IAddBook } from "../../adapters/ormAdapter/repositories/book/IAddBook"
import { IBook } from "../../entities/Book"


export class AddBookUseCase {

    protected bookService: IAddBook
    constructor(ormAdapter: IAddBook) {
        this.bookService = ormAdapter
    }

    async execute(bookData: Omit<IBook, "id">) {

        return await this.bookService.execute(bookData)

    

    }

}
