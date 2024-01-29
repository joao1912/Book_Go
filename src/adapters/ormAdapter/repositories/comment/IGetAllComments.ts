import { Comment } from "../../../../entities/Comment";

export interface IGetAllComments {

    execute(bookId: string): Promise<Comment[]>

}