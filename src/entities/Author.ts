import { z } from "zod";

/* export interface IAuthor {
    id?: string;
    name: string;
    description: string;
} */

const authorSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(12, { message: 'O nome precisa de no minimo 12 caracteres.' }),
    description: z.string().min(20, { message: 'A descrição precisa de no minimo 20 caracteres.' })
})

export type IAuthor = z.infer<typeof authorSchema>

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
