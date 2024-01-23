export interface IBook {
    id: string
    title: string;
    price: number
    synopsis: string;
}

export interface IAuthor {
    AuthorName: string;
    AuthorDescription: string;
}



export class Book {
 readonly id: string;
 readonly title: string;
 readonly price: number
 readonly synopsis: string;
 readonly genre: string;
 readonly quantity: number;
 readonly AuthorName: string;
 readonly AuthorDescription: string;

 constructor(id: string, title: string, price: number, synopsis:string, genre: string, quantity: number, AuthorName: string, AuthorDescription: string){
    this.id = id
    this.title = title
    this.price = price
    this.synopsis = synopsis
    this.genre = genre;
    this.quantity = quantity
    this.AuthorName = AuthorName
    this.AuthorDescription = AuthorDescription
   
 }

    getBook(){
        return {
            id: this.id,
            title: this.title,
            price: this.price,
            synopsis: this.synopsis,
            genre: this.genre,
            quantity: this.quantity
        }
    }

    getAuthor(){
        return {
            name: this.AuthorName,
            description: this.AuthorDescription
        }
    }

  


}