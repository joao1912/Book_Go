export interface IAuthor {
    id: string;
    name: string;
    description: string;
}

export class Author {
   
    readonly props: IAuthor

    constructor(props: IAuthor){
   
        const {id, name, description} = props

        this.props = props
      
    }
   
    get Author(){
        return {
            name: this.props.name,
            description: this.props.description
        }
    }
          
}
