import { IBook } from "./Book";

export interface IStock {
    id?: string;
    quantity: number;
    book: IBook
}


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