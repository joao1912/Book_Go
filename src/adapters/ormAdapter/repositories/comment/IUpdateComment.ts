import { Comment, IComment } from "../../../../entities/Comment";

export interface IUpdateComment {

    execute(commentUpdated: Comment): Promise<Comment | void>

}