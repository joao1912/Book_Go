import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { getStockByQuantity } from "../../../adapters/ormAdapter/protocols/stockProtocols";
import { IStock, Stock } from "../../../entities/Stock";
import { GetStockByQuantityUseCase } from "../../../usecases/stock/GetStockByQuantityUseCase";
import { IController } from "../IController";
import Formatter from "../utils/Formatter";
import ServerResponse from "../utils/ServerResponse";


class GetStockByQuantity implements IController {

    async handle(req: HttpRequest<{ quantity: number }>, res: HttpResponse) {

        const serverResponse = new ServerResponse(res)

        const quantity = Number(req.params.quantity)

        const getStockByQuantityUseCase = new GetStockByQuantityUseCase(getStockByQuantity)

        const response = await getStockByQuantityUseCase.execute(quantity)

        if (response.length == 0) {
            return serverResponse.ok(response)
        }

        if (response instanceof Stock && Array.isArray(response)) {
            let stockList: Array<IStock> = []

            for (let item of response) {

                stockList.push(
                    Formatter.handle<Stock>(item)
                )

            }

            return serverResponse.ok(stockList)
        }
    }
}

const getStockByQuantityController = new GetStockByQuantity()

export default getStockByQuantityController