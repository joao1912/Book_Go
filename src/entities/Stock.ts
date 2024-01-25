export interface IStock {
    id: string;
    quantity: string;
    fk_id_book: string;
}


export class Stock {
 readonly id: string;
 readonly quantity: number;
 readonly fk_id_book: string;


 constructor(id: string,  quantity: number,  fk_id_book: string){
    this.id = id
 
    this.quantity = quantity;
    this.fk_id_book = fk_id_book
   
 }

    get Stock(){
        return {
            id: this.id,
                  quantity:this.quantity,
            fk_id_book: this.fk_id_book
    
        }
    }
  
}