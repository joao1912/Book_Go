import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { getAllStock } from "../../../adapters/ormAdapter/protocols/stockProtocols";
import { GetAllStockUseCase } from "../../../usecases/stock/GetAllStockUseCase";



class GetAllStock {

    async handle(req: HttpRequest, res: HttpResponse){
        try {
            const getAllStockUseCase = new GetAllStockUseCase(getAllStock)

            const stockInstance = await getAllStockUseCase.execute()

            res.status(200).json(stockInstance)

            
        } catch (error) {
            throw new Error ("Bad request " + error)
        }


    }
}
const getAllStockController = new GetAllStock()

export default getAllStockController