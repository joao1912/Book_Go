import { Comment } from "../../../../entities/Comment";
import { IGetAllComments } from "../../repositories/comment/IGetAllComments";

export class GetAllComments implements IGetAllComments {
    execute(): Promise<Comment[]> {
        throw new Error("Method not implemented.");
    }
 
    
}