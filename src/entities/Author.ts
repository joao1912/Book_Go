

export interface IAuthor {
    id: string;
    name: string;
    description: string;
}


export class Author{
    readonly id: string;
    readonly name: string;
    readonly description: string;
   
    constructor(id: string, name: string, description: string){
    this.id = id
    this.name = name
    this.description = description

   
      
    }
   
       get Author(){
           return {
               name: this.name,
               description: this.description
           }
       }
       
   
   
   }
