import { IGetReservationByBookId } from "../../repositories/reservation/IGetReservationByBookId";
import { prisma } from "../db";

export class GetReservationByUserId implements IGetReservationByBookId {

     async execute(bookId: string) {
        
        try {
        
            const data = await prisma.reservation.findMany({
                where: {
                    fk_id_book: bookId
                },
                select: {
                    id: true,
                    fk_id_user: true,
                    fk_id_book: true,
                    price: true
                }
            })

            let dataArray = []
            for(let props of data){
  
                let reservation = {
                    id: props.id,
                    bookId: props.fk_id_book,
                    userId: props.fk_id_user,
                    price: props.price
                }
                dataArray.push(reservation)
            }

            return dataArray

        } catch (error) {
            throw new Error ("Internal error server" + error)
        }
        
    }
   
}