import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { getAllFinances } from "../../../adapters/ormAdapter/protocols/financeProtocols";
import { GetAllFinanceUseCase } from "../../../usecases/finance/GetAllFinanceUseCase";
import { IController } from "../IController";

class GetAllFinance implements IController {

    async handle(req: HttpRequest, res: HttpResponse) {
        
        try {
            
            const getAllFinanceUseCase = new GetAllFinanceUseCase(getAllFinances)

            const finance = await getAllFinanceUseCase.execute()

            res.status(200).json(finance)

        } catch (error) {
            
            throw new Error('Bad Request: ' + error)

        }

    }

}

const getAllFinanceController = new GetAllFinance()

export default getAllFinanceController