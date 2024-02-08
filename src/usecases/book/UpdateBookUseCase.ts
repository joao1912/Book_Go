import { IUpdateBook } from "../../adapters/ormAdapter/repositories/book/IUpdateBook"
import { Book, IBook } from "../../entities/Book"


export class UpdateBookUseCase {

    protected bookService: IUpdateBook
    constructor(ormAdapter: IUpdateBook) {
        this.bookService = ormAdapter
    }

    async execute(bookData: Partial<Book>) {

        return await this.bookService.execute(bookData)

    

    }

}
