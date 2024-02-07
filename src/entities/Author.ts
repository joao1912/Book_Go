export interface IAuthor {
    id?: string;
    name: string;
    description: string;
}

export class Author {
   
    readonly props: IAuthor

    constructor(props: IAuthor){
   
        const {id, name, description} = props

        this.props = props
      
    }

    set id(id: string) {
        this.id = id
    }
   
    get Author(){
        return {
            name: this.props.name,
            description: this.props.description
        }
    }
          
}
