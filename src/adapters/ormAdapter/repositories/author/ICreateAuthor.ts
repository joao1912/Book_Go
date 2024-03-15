import { Author } from "../../../../entities/Author";


export interface ICreateAuthor {

    execute(authorData: Omit<Author, 'id'>): Promise<Author | void>

}