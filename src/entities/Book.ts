export interface IBook {
    id?: string;
    title: string;
    author: string ;
    synopsis: string;
    price: number;
    genre: string;
    publishedDate: string;
    pageCount: number; 
    image?: any

}


export class Book {

    public readonly props: IBook


 constructor(props: IBook){
   
    const {id, title, synopsis, genre, price, author, publishedDate,pageCount, image} = props
   this.props = props


   
 }

    get Book(){
        return {
            id: this.props.id,
            title: this.props.title,
            synopsis: this.props.synopsis,
            price: this.props.price,
            publishedDate: this.props.publishedDate,
            pageCount: this.props.pageCount,
            genre: this.props.genre,
    
        }
    }
  
}