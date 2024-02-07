import { IUpdateBook } from "../../adapters/ormAdapter/repositories/book/IUpdateBook"
import { IBook } from "../../entities/Book"


export class UpdateBookUseCase {

    protected bookService: IUpdateBook
    constructor(ormAdapter: IUpdateBook) {
        this.bookService = ormAdapter
    }

    async execute(bookData: Partial<IBook>) {

        return await this.bookService.execute(bookData)

    

    }

}
