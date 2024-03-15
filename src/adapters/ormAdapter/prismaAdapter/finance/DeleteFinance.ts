import { IDeleteFinance, IDeleteMessage } from "../../repositories/finance/IDeleteFinance.js";
import { prisma } from "../db.js";
import handlePrismaError from "../util/handlePrismaError.js";


export class DeleteFinance implements IDeleteFinance {
    
    async execute(id: string): Promise<IDeleteMessage | void> {
        
        try {

            await prisma.finance.delete({
                where: {
                    id: id
                }
            })

            const message: IDeleteMessage = {
                message: 'Deletado com sucesso!'
            }
            return message

        } catch (error) {
            
            return handlePrismaError("FinanceError", error)

        }

    }

}