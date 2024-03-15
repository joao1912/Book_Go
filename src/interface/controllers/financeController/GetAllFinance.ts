import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { getAllFinances } from "../../../adapters/ormAdapter/protocols/financeProtocols";
import { GetAllFinanceUseCase } from "../../../usecases/finance/GetAllFinanceUseCase";
import { IController } from "../IController";
import ServerResponse from "../utils/ServerResponse";

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