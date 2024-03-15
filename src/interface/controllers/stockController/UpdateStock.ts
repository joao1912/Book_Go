import { HttpNext, HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol.js";
import { searchBookById } from "../../../adapters/ormAdapter/protocols/bookProtocols.js";
import { updateStock } from "../../../adapters/ormAdapter/protocols/stockProtocols.js";
import { Book, IBook } from "../../../entities/Book.js";
import { IStock, Stock } from "../../../entities/Stock.js";
import { SearchBookByIdUseCase } from "../../../usecases/book/SearchBookByIdUseCase.js";
import { UpdateStockUseCase } from "../../../usecases/stock/UpdateStockUseCase.js";
import { IController } from "../IController.js";
import Formatter from "../utils/Formatter.js";
import ServerResponse from "../utils/ServerResponse.js";


class UpdateStock implements IController {

    async handle(req: HttpRequest<{ bookId: string }, {}, { quantity: number }>, res: HttpResponse) {

        const serverResponse = new ServerResponse(res)

        let IBookType: IBook
        const searchBookByIdUseCase = new SearchBookByIdUseCase(searchBookById)


        const bookId = req.params.bookId

        const quantity = req.body.quantity

        const responseBook = await searchBookByIdUseCase.execute(bookId)
        //Verificando se id existe
        if (responseBook instanceof Book) {

            IBookType = responseBook.props

            const updateStockUseCase = new UpdateStockUseCase(updateStock)

            const response = await updateStockUseCase.execute({
                quantity: quantity,
                book: IBookType
            })

            if (response instanceof Stock) {
                return serverResponse.ok(
                    Formatter.handle<Stock>(response)
                )
            }


        }





    }
}

const updateStockController = new UpdateStock()

export default updateStockController