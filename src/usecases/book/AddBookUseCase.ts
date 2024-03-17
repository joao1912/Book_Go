import { IAddBook } from "../../adapters/ormAdapter/repositories/book/IAddBook"
import { Book, IBook } from "../../entities/Book"
import ServerResponse from "../../interface/controllers/utils/ServerResponse"


export class AddBookUseCase {

    protected bookService: IAddBook
    constructor(ormAdapter: IAddBook) {
        this.bookService = ormAdapter
    }

    async execute(bookData: IBook) {
     
        for (let keyProp in bookData) {
            let valueProp = bookData[keyProp]
            console.log(typeof keyProp, typeof bookData[keyProp])
            if (!valueProp) {
                ServerResponse.badRequest("AdminError", `${keyProp.toUpperCase()} cannot be empty/undefined`)
            }
        }



        const bookInstance = new Book(bookData)

        return await this.bookService.execute(bookInstance)

    }

}
