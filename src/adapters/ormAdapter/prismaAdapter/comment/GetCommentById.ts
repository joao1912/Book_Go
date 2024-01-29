import { Comment } from "../../../../entities/Comment";
import { IGetCommentById } from "../../repositories/comment/IGetCommentById";

export class GetCommentById implements IGetCommentById {
    execute(id: string): Promise<Comment> {
        throw new Error("Method not implemented.");
    }
    
}