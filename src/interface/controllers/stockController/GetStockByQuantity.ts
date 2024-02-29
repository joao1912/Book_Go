import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { getStockByQuantity } from "../../../adapters/ormAdapter/protocols/stockProtocols";
import { IStock, Stock } from "../../../entities/Stock";
import { GetStockByQuantityUseCase } from "../../../usecases/stock/GetStockByQuantityUseCase";
import { IController } from "../IController";
import Formatter from "../utils/Formatter";
import ServerResponse from "../utils/ServerResponse";


class GetStockByQuantity implements IController {
    
    async handle(req: HttpRequest<{quantity:number}>, res: HttpResponse){

        const serverResponse = new ServerResponse(res)

        try {
            const quantity = Number(req.params.quantity)

            const getStockByQuantityUseCase = new GetStockByQuantityUseCase(getStockByQuantity)

            const stockInstances = await getStockByQuantityUseCase.execute(quantity)

            let stockList: Array<IStock> = []

            for (let item of stockInstances) {

                stockList.push(
                    Formatter.handle<Stock>(item)
                )

            }

            return serverResponse.ok(stockList)

        } catch (error) {
            throw new Error ("Bad request " + error)
        }

    }
}

const getStockByQuantityController = new GetStockByQuantity()

export default getStockByQuantityController