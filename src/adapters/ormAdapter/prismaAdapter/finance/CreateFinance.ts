import { IFinance, Finance } from "../../../../entities/Finance";
import { ICreateFinance } from "../../repositories/finance/ICreateFinance";
import { prisma } from "../db";

export class CreateFinance implements ICreateFinance {

    async execute(financeData: Omit<IFinance, "id">): Promise<Finance> {
        
        try {
            
            const newFinance = await prisma.finance.create({
                data: {
                    payments: financeData.payment,
                    total: financeData.total,
                    fk_id_book: financeData.bookId,
                    fk_id_user: financeData.userId
                }
            })

            return new Finance({
                id: newFinance.id,
                bookId: newFinance.fk_id_book,
                payment: newFinance.payments,
                userId: newFinance.fk_id_user,
                total: newFinance.total
            })

        } catch (error) {

            throw new Error('internal server error: ' + error)
            
        }
    }
}