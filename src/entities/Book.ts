export interface IBook {
    id: string
    title: string;
    synopsis: string;
    price: string

}


export class Book {
 readonly id: string;
 readonly title: string;
 readonly synopsis: string;
 readonly price: number
 readonly genre: string[];


 constructor(id: string, title: string, synopsis:string, genre: string, price: number){
    this.id = id
    this.title = title
    this.synopsis = synopsis
    this.price = price;
    this.genre = [genre];

   
 }

    get Book(){
        return {
            id: this.id,
            title: this.title,
            synopsis: this.synopsis,
            price: this.price,
            genre: this.genre,
    
        }
    }
  
}