import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol.js";
import { getAllFinances } from "../../../adapters/ormAdapter/protocols/financeProtocols.js";
import { GetAllFinanceUseCase } from "../../../usecases/finance/GetAllFinanceUseCase.js";
import { IController } from "../IController.js";
import ServerResponse from "../utils/ServerResponse.js";

class GetAllFinance implements IController {

    async handle(req: HttpRequest, res: HttpResponse) {

        const serverResponse = new ServerResponse(res)
        
        try {
            
            const getAllFinanceUseCase = new GetAllFinanceUseCase(getAllFinances)

            const finance = await getAllFinanceUseCase.execute()

            return serverResponse.ok(finance)

        } catch (error) {
            
            throw new Error('Bad Request: ' + error)

        }

    }

}

const getAllFinanceController = new GetAllFinance()

export default getAllFinanceController