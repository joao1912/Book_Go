import { IGetAllBooks } from "../../adapters/ormAdapter/repositories/book/IGetAllBooks"


export class GetAllBooksUseCase {

    protected getAllBooksService: IGetAllBooks
    constructor(ormAdapter: IGetAllBooks){
        this.getAllBooksService = ormAdapter
    }

    async execute (){
        return await this.getAllBooksService.execute()
    
    }

}