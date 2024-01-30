import { Author, IAuthor } from "../../../../entities/Author";


export interface ICreateAuthor {

    execute(authorData: Omit<IAuthor, 'id'>): Promise<Author>

}