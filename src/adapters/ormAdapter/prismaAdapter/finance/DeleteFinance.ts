import { IDeleteFinance, IDeleteMessage } from "../../repositories/finance/IDeleteFinance";
import { prisma } from "../db";


export class DeleteFinance implements IDeleteFinance {
    
    async execute(id: string): Promise<IDeleteMessage> {
        
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
            
            throw new Error('internal server error: ' + error)

        }

    }

}