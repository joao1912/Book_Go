import { Author } from "../../../../entities/Author";


export interface IGetAuthorById {

    execute(id: string): Promise<Author | void>

}