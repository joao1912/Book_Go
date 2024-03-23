import { IGetAllFinances } from "../../adapters/ormAdapter/repositories/finance/IGetAllFinances";


export class GetAllFinanceUseCase {

    protected getAllFinanceService: IGetAllFinances

    constructor(ormAdapter: IGetAllFinances) {

        this.getAllFinanceService = ormAdapter

    }

    async execute() {

        return await this.getAllFinanceService.execute()

    }

}
