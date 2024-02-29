import { HttpNext, HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { searchBookById } from "../../../adapters/ormAdapter/protocols/bookProtocols";
import { updateStock } from "../../../adapters/ormAdapter/protocols/stockProtocols";
import { IBook } from "../../../entities/Book";
import { IStock, Stock } from "../../../entities/Stock";
import { SearchBookByIdUseCase } from "../../../usecases/book/SearchBookByIdUseCase";
import { UpdateStockUseCase } from "../../../usecases/stock/UpdateStockUseCase";
import { IController } from "../IController";
import Formatter from "../utils/Formatter";
import ServerResponse from "../utils/ServerResponse";


class UpdateStock implements IController {
    
    async handle(req: HttpRequest<{ book_Id: string }, {}, { quantity: number }>, res: HttpResponse) {

        const serverResponse = new ServerResponse(res)

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

                return serverResponse.ok(
                    Formatter.handle<Stock>(stockInstance)
                )

            } else {
                return serverResponse.notFound(bookInstance)
            }

        } catch (error) {
            throw new Error("Bad request: " + error)
        }


    }
}

const updateStockController = new UpdateStock()

export default updateStockController