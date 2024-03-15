import { Finance } from "../../../../entities/Finance.js";
import { typeOfPayment } from "../../repositories/finance/ICreateFinance.js";
import { IAllFinance, IGetAllFinances } from "../../repositories/finance/IGetAllFinances.js";
import { prisma } from "../db.js";
import handlePrismaError from "../util/handlePrismaError.js";


export class GetAllFinances implements IGetAllFinances {

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

    async execute(): Promise<IAllFinance[] | void> {

        try {

            const financeData = await prisma.finance.findMany({
                orderBy: {
                    createdAt: "asc"
                },
                select: {

                    id: true,
                    payments: true,
                    total: true,
                    fk_id_user: true,

                    book: {
                        select: {
                            id: true,
                            title: true,
                            synopsis: true,
                            price: true,
                            publishedDate: true,
                            pageCount: true,
                            author: {
                                select: {
                                    name: true
                                }
                            },
                            tag: {
                                select: {
                                    genre: true
                                }
                            }
                        }
                    }
                }
            })

            let finance: IAllFinance[] = []

            for (let data of financeData) {

                finance.push(
                    {
                        id: data.id,
                        payment: this.toEnumPayment(data.payments),
                        total: data.total,
                        book: {
                            id: data.book.id,
                            title: data.book.title,
                            synopsis: data.book.synopsis,
                            price: data.book.price,
                            pageCount: data.book.pageCount,
                            publishedDate: data.book.publishedDate,
                            genre: data.book.tag[0].genre,
                            author: data.book.author[0].name
                        },
                        userId: data.fk_id_user,
    
                    }
                )

            }

            return finance

        } catch (error) {

            return handlePrismaError("FinanceError", error)

        }

    }

}