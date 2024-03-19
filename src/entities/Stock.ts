import { IBook, bookSchema } from "./Book";
import { ZodType, z } from "zod"


export interface IStock {
    id?: string;
    quantity: number;
    book: IBook
}


export const stockSchema = z.object({
    id: z.string().uuid().optional(),
    quantity: z.number(),
    book: bookSchema
}) satisfies ZodType<IStock>


export class Stock {
 
    public readonly props: IStock;

 constructor(props: IStock){
   const {id, quantity, book} = props
   
   this.props = props
 
 }

    get Stock(){
        return {
            id: this.props.id,
            quantity:this.props.quantity,
            book: this.props.book
    
        }
    }
  
}