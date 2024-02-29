import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { getStockByBookTitle } from "../../../adapters/ormAdapter/protocols/stockProtocols";
import { IStock, Stock } from "../../../entities/Stock";
import { GetStockByBookTitleUseCase } from "../../../usecases/stock/GetStockByBookTitleUseCase";
import { IController } from "../IController";
import Formatter from "../utils/Formatter";
import ServerResponse from "../utils/ServerResponse";


class GetStockByBookTitle implements IController {
    
    async handle(req: HttpRequest<{title:string}>, res: HttpResponse){

        const serverResponse = new ServerResponse(res)

        try {
            let titleText = req.params.title
            
            const title = titleText.replaceAll("_"," ")

            const getStockByBookTitleUseCase = new GetStockByBookTitleUseCase(getStockByBookTitle)

            const stockInstances = await getStockByBookTitleUseCase.execute(title)

            let stockList: Array<IStock> = []

            for (let item of stockInstances) {

                stockList.push(
                    Formatter.handle<Stock>(item)
                )

            }

            return serverResponse.ok(stockList)

        } catch (error) {
            throw new Error ("Bad request: "+ error)
        }
    }

}

const getStockByBookTitleController = new GetStockByBookTitle()

export default getStockByBookTitleController