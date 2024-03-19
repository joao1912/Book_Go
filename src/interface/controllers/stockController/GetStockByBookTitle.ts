import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { getStockByBookTitle } from "../../../adapters/ormAdapter/protocols/stockProtocols";
import { IStock, Stock } from "../../../entities/Stock";
import { GetStockByBookTitleUseCase } from "../../../usecases/stock/GetStockByBookTitleUseCase";
import { IController } from "../IController";
import Formatter from "../utils/Formatter";
import ServerResponse from "../utils/ServerResponse";


class GetStockByBookTitle implements IController {

    async handle(req: HttpRequest<{ title: string }>, res: HttpResponse) {

        const serverResponse = new ServerResponse(res)

            let titleText = req.params.title

            const getStockByBookTitleUseCase = new GetStockByBookTitleUseCase(getStockByBookTitle)

            const response = await getStockByBookTitleUseCase.execute(titleText)

            if (response instanceof Stock && Array.isArray(response)){
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

const getStockByBookTitleController = new GetStockByBookTitle()

export default getStockByBookTitleController