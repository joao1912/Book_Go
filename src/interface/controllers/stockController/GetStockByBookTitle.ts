import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { getStockByBookTitle } from "../../../adapters/ormAdapter/protocols/stockProtocols";
import { GetStockByBookTitleUseCase } from "../../../usecases/stock/GetStockByBookTitleUseCase";
import { IController } from "../IController";


class GetStockByBookTitle implements IController {
    
    async handle(req: HttpRequest<{title:string}>, res: HttpResponse){
        try {
            let titleText = req.params.title
            
            const title = titleText.replaceAll("_"," ")
            console.log(title)

            const getStockByBookTitleUseCase = new GetStockByBookTitleUseCase(getStockByBookTitle)

            const stockInstance = await getStockByBookTitleUseCase.execute(title)

            res.status(200).json(stockInstance)

        } catch (error) {
            throw new Error ("Bad request: "+ error)
        }
    }

}

const getStockByBookTitleController = new GetStockByBookTitle()

export default getStockByBookTitleController