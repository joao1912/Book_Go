import { Comment, IComment } from "../../../../entities/Comment";

export interface IUpdateComment {

    execute(commentUpdated: Partial<IComment>): Promise<Partial<Comment>>

}