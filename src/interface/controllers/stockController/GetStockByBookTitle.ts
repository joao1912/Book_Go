import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol.js";
import { getStockByBookTitle } from "../../../adapters/ormAdapter/protocols/stockProtocols.js";
import { IStock, Stock } from "../../../entities/Stock.js";
import { GetStockByBookTitleUseCase } from "../../../usecases/stock/GetStockByBookTitleUseCase.js";
import { IController } from "../IController.js";
import Formatter from "../utils/Formatter.js";
import ServerResponse from "../utils/ServerResponse.js";


class GetStockByBookTitle implements IController {

    async handle(req: HttpRequest<{ title: string }>, res: HttpResponse) {

        const serverResponse = new ServerResponse(res)

        try {
          
            let titleText = req.params.title

            // const title = titleText.replaceAll("_", " ")

            const getStockByBookTitleUseCase = new GetStockByBookTitleUseCase(getStockByBookTitle)

            const response = await getStockByBookTitleUseCase.execute(titleText)

            
            if (typeof response !== 'string') {
                let stockList: Array<IStock> = []
                
                for (let item of response) {

                    stockList.push(
                        Formatter.handle<Stock>(item)
                    )

                }

                return serverResponse.ok(stockList)
            }
           
            switch (true) {

                case (response == "Book not found."):
                    return serverResponse.notFound(response)
                    break;

                case (response == "Invalid input type provided."):
                    return serverResponse.badRequest(response)
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

const getStockByBookTitleController = new GetStockByBookTitle()

export default getStockByBookTitleController