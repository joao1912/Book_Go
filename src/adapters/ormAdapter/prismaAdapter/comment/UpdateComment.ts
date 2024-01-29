import { IComment, Comment } from "../../../../entities/Comment";
import { IUpdateComment } from "../../repositories/comment/IUpdateComment";

export class UpdateComment implements IUpdateComment {
    
    execute(commentUpdated: Partial<IComment>): Promise<Comment> {
        throw new Error("Method not implemented.");
    }

}