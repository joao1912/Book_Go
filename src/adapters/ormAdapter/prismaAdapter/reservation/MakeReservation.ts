import { prisma } from "../db";
import { IBook, Book } from "../../../../entities/Book";
import { IMakeReservation } from "../../repositories/reservation/IMakeReservation";
import { IReservation } from "../../../../entities/Reservation";


export class MakeReservation implements IMakeReservation {

   
    async execute({userId, bookId, price, startedAt, endsAt, completed,}: Omit<IReservation, "id">): Promise <IReservation>{
       
        try {

            const data = await prisma.reservation.create({
                data: {
                    fk_id_book: bookId,
                    fk_id_user: userId,
                    price: price
                    
    
                  },
                  select: {
                    id: true,
                    fk_id_book: true,
                    fk_id_user: true,
                    price: true,
                    createdAt: true,
                  
                      }
                    
                
                 
                    
            })
     
            
            let newReservation = {
                
                id: data.id, 
                userId: data.fk_id_user,
                bookId: data.fk_id_book,
                price: data.price,
                startedAt: data.createdAt,
                endsAt: data.createdAt,
            }
            
           
    
            return newReservation
            
        } catch (error) {
            throw new Error("Internal server error: " + error);
        }
    

    }
}