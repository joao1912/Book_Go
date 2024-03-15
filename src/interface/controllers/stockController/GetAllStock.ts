import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol.js";
import { getAllStock } from "../../../adapters/ormAdapter/protocols/stockProtocols.js";
import { IStock, Stock } from "../../../entities/Stock.js";
import { GetAllStockUseCase } from "../../../usecases/stock/GetAllStockUseCase.js";
import { IController } from "../IController.js";
import Formatter from "../utils/Formatter.js";
import ServerResponse from "../utils/ServerResponse.js";


class GetAllStock implements IController {

    async handle(req: HttpRequest, res: HttpResponse) {

            const serverResponse = new ServerResponse(res)

            const getAllStockUseCase = new GetAllStockUseCase(getAllStock)

            const response = await getAllStockUseCase.execute()

            let stockList: Array<IStock> = []
            if (response instanceof Stock && Array.isArray(response))
                for (let item of response) {

                    stockList.push(
                        Formatter.handle<Stock>(item)
                    )

                }

            return serverResponse.ok(stockList)

    }
}
const getAllStockController = new GetAllStock()

export default getAllStockController