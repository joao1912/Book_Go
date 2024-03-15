import { Author } from "../../../../entities/Author";


export interface IGetAuthorByName {

    execute(name: string): Promise<Author | void>

}