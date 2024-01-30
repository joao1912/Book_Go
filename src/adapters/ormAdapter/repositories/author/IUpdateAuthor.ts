import { Author, IAuthor } from "../../../../entities/Author";


export interface IUpdateAuthor {

    execute(authorToBeUpdated: Partial<IAuthor>): Promise<Author>

}