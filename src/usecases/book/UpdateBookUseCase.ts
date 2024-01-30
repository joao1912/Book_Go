import { IUpdateBook } from "../../adapters/ormAdapter/repositories/book/IUpdateBook"
import { IBook } from "../../entities/Book"


export class UpdateBook {

    protected bookService: IUpdateBook
    constructor(ormAdapter: IUpdateBook) {
        this.bookService = ormAdapter
    }

    async execute(bookData: Partial<IBook>) {

        const book = await this.bookService.execute(bookData)

    

    }

}
