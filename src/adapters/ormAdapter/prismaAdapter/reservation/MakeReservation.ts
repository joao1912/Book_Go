import { prisma } from "../db";
import { IBook, Book } from "../../../../entities/Book";
import { IMakeReservation } from "../../repositories/reservation/IMakeReservation";
import { IReservation, Reservation } from "../../../../entities/Reservation";


export class MakeReservation implements IMakeReservation {


    async execute({userId, bookId, price, startedAt, endsAt, status}: Omit<IReservation, "id">): Promise <Reservation>{
       
        try {

            const data = await prisma.reservation.create({
                data: {
                    fk_id_book: bookId,
                    fk_id_user: userId,
                    price: price,
                    status: status
                    
    
                  },
                  select: {
                    id: true,
                    fk_id_book: true,
                    fk_id_user: true,
                    price: true,
                    status: true,
                    createdAt: true,
                  
                      }
                    
                
                 
                    
            })
     
            
            return new Reservation ({
                
                id: data.id, 
                userId: data.fk_id_user,
                bookId: data.fk_id_book,
                price: data.price,
                status: data.status,
                startedAt: data.createdAt,
                endsAt: data.createdAt,
            })
            
   
        } catch (error) {
            throw new Error("Internal server error: " + error);
        }
    

    }
}