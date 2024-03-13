import { IGetAllBooks } from "../../adapters/ormAdapter/repositories/book/IGetAllBooks.js"

export class GetAllBooksUseCase {

    protected bookService: IGetAllBooks
    constructor(ormAdapter: IGetAllBooks){
        this.bookService = ormAdapter
    }

    async execute (){
        return await this.bookService.execute()
    
    }

}