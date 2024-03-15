import { Author } from "../../../../entities/Author";


export interface IUpdateAuthor {

    execute(authorToBeUpdated: Partial<Author>): Promise<Author | void>

}