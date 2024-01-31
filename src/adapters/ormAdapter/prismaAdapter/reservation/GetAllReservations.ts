import { IGetAllReservation } from "../../repositories/reservation/IGetAllReservations";
import { prisma } from "../db";

export class GetAllReservations implements IGetAllReservation {

     async execute() {
        
        try {
        
            const data = await prisma.reservation.findMany({
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