import { Finance } from "../../../../entities/Finance";
import { IGetFinanceById } from "../../repositories/finance/IGetFinanceById";
import { prisma } from "../db";


export class GetFinanceById implements IGetFinanceById {

    async execute(id: string): Promise<Finance> {

        try {

            const financeData = await prisma.finance.findUnique({
                where: {
                    id: id
                }
            })

            if (financeData == null) {
                throw new Error('Can not find finance by id')
            }

            return new Finance({
                id: financeData.id,
                bookId: financeData.fk_id_book,
                payment: financeData.payments,
                total: financeData.total,
                userId: financeData.fk_id_user
            })
            
        } catch (error) {

            throw new Error('Internal server error: ' + error)
            
        }
    }
}