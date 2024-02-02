import { IFinance, Finance } from "../../../../entities/Finance";
import { ICreateFinance, IRegister } from "../../repositories/finance/ICreateFinance";
import { prisma } from "../db";

export class CreateFinance implements ICreateFinance {


    async insertIntoRegister({ author, email, payment, telephone, title, total }: IRegister): Promise<void> {

        await prisma.register.create({
            data: {
                author: author,
                email: email,
                payment: payment,
                telephone: telephone,
                title: title,
                total: total,
            }
        })

    }

    async execute(financeData: Omit<IFinance, "id">): Promise<Finance> {

        try {

            const newFinance = await prisma.finance.create({
                data: {
                    payments: financeData.payment,
                    total: financeData.total,
                    fk_id_book: financeData.bookId,
                    fk_id_user: financeData.userId,

                },
                include: {
                    book: {
                        select: {
                            author: {
                                select: {
                                    name: true
                                }
                            },
                            title: true
                        }
                    },
                    user: {
                        select: {
                            email: true,
                            telephone: true
                        }
                    },
                }
            })

            this.insertIntoRegister({
                author: newFinance.book.author[0].name,
                email: newFinance.user.email,
                payment: newFinance.payments,
                telephone: newFinance.user.telephone,
                title: newFinance.book.title,
                total: newFinance.total   
            })

            return new Finance({
                id: newFinance.id,
                bookId: newFinance.fk_id_book,
                payment: newFinance.payments,
                userId: newFinance.fk_id_user,
                total: newFinance.total,
            })

        } catch (error) {

            throw new Error('internal server error: ' + error)

        }
    }
}