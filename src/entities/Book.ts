export interface IBook {
    id: string
    title: string;
    synopsis: string;
    price: string
    readonly genre: string[];

}


export class Book {

    public readonly props: IBook


 constructor(props: IBook){
   
    const {id, title, synopsis, genre, price} = props
   this.props = props


   
 }

    get Book(){
        return {
            id: this.props.id,
            title: this.props.title,
            synopsis: this.props.synopsis,
            price: this.props.price,
            genre: this.props.genre,
    
        }
    }
  
}