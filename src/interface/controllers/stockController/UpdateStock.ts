import { HttpNext, HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { searchBookById } from "../../../adapters/ormAdapter/protocols/bookProtocols";
import { updateStock } from "../../../adapters/ormAdapter/protocols/stockProtocols";
import { IBook } from "../../../entities/Book";
import { IStock } from "../../../entities/Stock";
import { SearchBookByIdUseCase } from "../../../usecases/book/SearchBookByIdUseCase";
import { UpdateStockUseCase } from "../../../usecases/stock/UpdateStockUseCase";
import { IController } from "../IController";


class UpdateStock implements IController {
    
    async handle(req: HttpRequest<{ book_Id: string }, {}, { quantity: number }>, res: HttpResponse) {

        let IBookType: IBook
        const searchBookByIdUseCase = new SearchBookByIdUseCase(searchBookById)

        try {
            const bookId = req.params.book_Id
           
            const bookInstance = await searchBookByIdUseCase.execute(bookId)

            if (typeof bookInstance !== "string") {
                IBookType = bookInstance.props
            
                const quantity = req.body.quantity

                const updateStockUseCase = new UpdateStockUseCase(updateStock)

                const stockInstance = await updateStockUseCase.execute({
                    quantity: quantity,
                    book: IBookType
                })
                res.status(200).json(stockInstance)
            } else {
                res.status(404).json(bookInstance)
            }

        } catch (error) {
            throw new Error("Bad request: " + error)
        }


    }
}

const updateStockController = new UpdateStock()

export default updateStockController