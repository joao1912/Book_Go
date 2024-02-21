import { IGetAllFinances } from "../../adapters/ormAdapter/repositories/finance/IGetAllFinances";

export class GetAllFinanceUseCase {

    protected getAllFinanceAdapter: IGetAllFinances

    constructor(ormAdapter: IGetAllFinances) {

        this.getAllFinanceAdapter = ormAdapter

    }

    async execute() {

        const finance = await this.getAllFinanceAdapter.execute()

        return finance

    }

}