export interface IStock {
    id: string;
    quantity: string;
    fk_id_book: string;
}


export class Stock {
 readonly props: IStock;


 constructor(props: IStock){
   const {id,  quantity,  fk_id_book} = props
   
   this.props = props
 
 }

    get Stock(){
        return {
            id: this.props.id,
            quantity:this.props.quantity,
            fk_id_book: this.props.fk_id_book
    
        }
    }
  
}