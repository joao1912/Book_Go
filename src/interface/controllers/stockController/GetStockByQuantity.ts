import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { getStockByQuantity } from "../../../adapters/ormAdapter/protocols/stockProtocols";
import { GetStockByQuantityUseCase } from "../../../usecases/stock/GetStockByQuantityUseCase";


class GetStockByQuantity {
    async handle(req: HttpRequest<{quantity:number}>, res: HttpResponse){
        try {
            const quantity = Number(req.params.quantity)

            const getStockByQuantityUseCase = new GetStockByQuantityUseCase(getStockByQuantity)

            const stockInstance = await getStockByQuantityUseCase.execute(quantity)

            res.status(200).json(stockInstance)

        } catch (error) {
            throw new Error ("Bad request " + error)
        }

    }
}

const getStockByQuantityController = new GetStockByQuantity()

export default getStockByQuantityController