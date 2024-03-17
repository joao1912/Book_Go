import { IFinance, Finance } from "../../../../entities/Finance";
import { ICreateFinance, IRegister, typeOfPayment } from "../../repositories/finance/ICreateFinance";
import { prisma } from "../db";
import handlePrismaError from "../util/handlePrismaError";

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

    async execute({props}: Omit<Finance, "id">): Promise<Finance | void> {

        const {payment, total, bookId, userId} = props;

        try {

            const newFinance = await prisma.finance.create({
                data: {
                    payments: payment,
                    total: total,
                    fk_id_book: bookId,
                    fk_id_user: userId,

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
                payment: this.toEnumPayment(newFinance.payments),
                userId: newFinance.fk_id_user,
                total: newFinance.total,
            })

        } catch (error) {

            handlePrismaError("FinanceError", error)

        }
    }
}