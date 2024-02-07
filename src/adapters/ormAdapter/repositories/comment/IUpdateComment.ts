import { Comment, IComment } from "../../../../entities/Comment";

export interface IUpdateComment {

    execute(commentUpdated: Partial<Comment>): Promise<Partial<Comment>>

}