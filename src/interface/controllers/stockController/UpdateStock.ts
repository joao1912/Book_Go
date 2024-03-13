import { HttpNext, HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol.js";
import { searchBookById } from "../../../adapters/ormAdapter/protocols/bookProtocols.js";
import { updateStock } from "../../../adapters/ormAdapter/protocols/stockProtocols.js";
import { IBook } from "../../../entities/Book.js";
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

        try {
            const bookId = req.params.bookId

            const quantity = req.body.quantity

            const bookInstance = await searchBookByIdUseCase.execute(bookId)

            if (typeof bookInstance !== "string") {
               
                IBookType = bookInstance.props

                const updateStockUseCase = new UpdateStockUseCase(updateStock)

                const response = await updateStockUseCase.execute({
                    quantity: quantity,
                    book: IBookType
                })

                if(typeof response !== "string"){

                    return serverResponse.ok(
                        Formatter.handle<Stock>(response)
                    )
                }


            }
            switch (true) {

                case (bookInstance == "Invalid input type provided."):
                    return serverResponse.badRequest(bookInstance)
                    break;

                // case (response == ""):
                //     return serverResponse.notFound(response)
                //     break;

                case (bookInstance == "Id provided does not exist."):
                    return serverResponse.notFound(bookInstance)
                    break;

                case (bookInstance == "Internal server error"):
                    return serverResponse.serverError(bookInstance)
                    break;
            }

         


        } catch (error) {
            console.log(error)
            throw new Error("Something happened. Please try again later")
        }


    }
}

const updateStockController = new UpdateStock()

export default updateStockController