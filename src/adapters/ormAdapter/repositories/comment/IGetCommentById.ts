import { Comment } from "../../../../entities/Comment";

export interface IGetCommentById {

    execute(id: string): Promise<Comment | void>

}