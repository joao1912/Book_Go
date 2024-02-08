import { IUpdateBook } from "../../adapters/ormAdapter/repositories/book/IUpdateBook"
import { Book, IBook } from "../../entities/Book"


export class UpdateBookUseCase {

    protected bookService: IUpdateBook
    constructor(ormAdapter: IUpdateBook) {
        this.bookService = ormAdapter
    }

    async execute(bookData: IBook) {
        
        const bookInstance = new Book(bookData)

        return await this.bookService.execute(bookInstance)

    

    }

}
