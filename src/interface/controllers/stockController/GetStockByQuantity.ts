import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol.js";
import { getStockByQuantity } from "../../../adapters/ormAdapter/protocols/stockProtocols.js";
import { IStock, Stock } from "../../../entities/Stock.js";
import { GetStockByQuantityUseCase } from "../../../usecases/stock/GetStockByQuantityUseCase.js";
import { IController } from "../IController.js";
import Formatter from "../utils/Formatter.js";
import ServerResponse from "../utils/ServerResponse.js";


class GetStockByQuantity implements IController {

    async handle(req: HttpRequest<{ quantity: number }>, res: HttpResponse) {

        const serverResponse = new ServerResponse(res)

        try {
            const quantity = Number(req.params.quantity)

            const getStockByQuantityUseCase = new GetStockByQuantityUseCase(getStockByQuantity)

            const response = await getStockByQuantityUseCase.execute(quantity)

            let stockList: Array<IStock> = []
           
            if (typeof response !== 'string') {
                for (let item of response) {

                    stockList.push(
                        Formatter.handle<Stock>(item)
                    )

                }

                return serverResponse.ok(stockList)
            }

            switch (true) {

                case (response == "Invalid input type provided."):
                    return serverResponse.badRequest(response)
                    break;

                case (response == "No books found with this quantity."):
                    return serverResponse.notFound(response)
                    break;

                case (response == "Internal server error"):
                    return serverResponse.serverError(response)
                    break;
            }

        } catch (error) {
            console.log(error)
            throw new Error("Something happened. Please try again later")
        }

    }
}

const getStockByQuantityController = new GetStockByQuantity()

export default getStockByQuantityController