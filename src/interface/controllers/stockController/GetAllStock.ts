import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { getAllStock } from "../../../adapters/ormAdapter/protocols/stockProtocols";
import { IStock, Stock } from "../../../entities/Stock";
import { GetAllStockUseCase } from "../../../usecases/stock/GetAllStockUseCase";
import { IController } from "../IController";
import Formatter from "../utils/Formatter";
import ServerResponse from "../utils/ServerResponse";


class GetAllStock implements IController {

    async handle(req: HttpRequest, res: HttpResponse) {

        const serverResponse = new ServerResponse(res)

        const getAllStockUseCase = new GetAllStockUseCase(getAllStock)

        const response: Stock[] = await getAllStockUseCase.execute()

        let stockList: Array<IStock> = []

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