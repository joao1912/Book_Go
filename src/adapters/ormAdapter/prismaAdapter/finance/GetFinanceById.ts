import { Finance } from "../../../../entities/Finance.js";
import { typeOfPayment } from "../../repositories/finance/ICreateFinance.js";
import { IGetFinanceById } from "../../repositories/finance/IGetFinanceById.js";
import { prisma } from "../db.js";
import handlePrismaError from "../util/handlePrismaError.js";


export class GetFinanceById implements IGetFinanceById {

    private toEnumPayment(type: string): typeOfPayment {

        let typePayment: typeOfPayment

        switch(type) {

            case "Ticket":
                typePayment = typeOfPayment.Ticket
                break
            case "Credit card":
                typePayment = typeOfPayment.CreditCard
                break
            case "Debit card":
                typePayment = typeOfPayment.DebitCard
                break
            case "Pix":
                typePayment = typeOfPayment.Pix
                break
            default:
                throw new Error('Internal server error: Type of Payment is undefined')
        }

        return typePayment

    }

    async execute(id: string): Promise<Finance | void> {

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
                payment: this.toEnumPayment(financeData.payments),
                total: financeData.total,
                userId: financeData.fk_id_user
            })
            
        } catch (error) {

            return handlePrismaError("FinanceError", error)
            
        }
    }
}