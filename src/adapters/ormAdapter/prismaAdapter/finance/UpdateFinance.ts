import { IFinance, Finance } from "../../../../entities/Finance";
import { IUpdateFinance } from "../../repositories/finance/IUpdateFinance";
import { prisma } from "../db";


export class UpdateFinance implements IUpdateFinance {

    async execute({payment, id, total}: Partial<IFinance>): Promise<Partial<Finance>> {
        
        try {

            const updatedFinance = await prisma.finance.update({
                where: {
                    id: id
                },
                data: {
                    payments: payment || undefined,
                    total: total || undefined
                }
            })

            return new Finance({
                id: updatedFinance.id,
                payment: updatedFinance.payments,
                total: updatedFinance.total,
                bookId: updatedFinance.fk_id_book,
                userId: updatedFinance.fk_id_user 
            })
            
        } catch (error) {

            throw new Error('Internal server error: ' + error)

        }
    }
}