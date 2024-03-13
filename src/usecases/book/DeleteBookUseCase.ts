import { IDeleteBook } from "../../adapters/ormAdapter/repositories/book/IDeleteBook.js";


export class DeleteBookUseCase {

    protected bookService: IDeleteBook

    constructor(ormAdapter: IDeleteBook) {
        this.bookService = ormAdapter
    }

    async execute(id: string) {

        try {
            
            return await this.bookService.execute(id)

        } catch (error) {

            throw new Error('Internal server error: ' + error)
            
        }

    }

}