import { Author } from "../../../../entities/Author";


export interface IGetAllAuthors {

    execute(): Promise<Author[]>

}