import { Finance } from "../../../../entities/Finance";
import { typeOfPayment } from "../../repositories/finance/ICreateFinance";
import { IAllFinance, IGetAllFinances } from "../../repositories/finance/IGetAllFinances";
import { prisma } from "../db";


export class GetAllFinances implements IGetAllFinances {

    async execute(): Promise<IAllFinance[]> {

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

                let typePayment: typeOfPayment = typeOfPayment.Ticket

                switch(data.payments) {

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

                finance.push(
                    {
                        id: data.id,
                        payment: typePayment,
                        total: data.total,
                        book: {
                            id: data.book.id,
                            title: data.book.title,
                            synopsis: data.book.synopsis,
                            price: data.book.price,
                            genre: data.book.tag[0].genre,
                            author: data.book.author[0].name
                        },
                        userId: data.fk_id_user,
    
                    }
                )

            }

            return finance

        } catch (error) {

            throw new Error('Internal server error: ' + error)

        }

    }

}