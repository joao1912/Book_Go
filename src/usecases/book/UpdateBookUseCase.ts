import { IUpdateBook } from "../../adapters/ormAdapter/repositories/book/IUpdateBook"
import { Book } from "../../entities/Book"


export class UpdateBook {

    protected bookService: IUpdateBook
    constructor(ormAdapter: IUpdateBook) {
        this.bookService = ormAdapter
    }

    async execute(bookData: Partial<Book>) {

        const book = await this.bookService.execute(bookData)

    

    }

}
