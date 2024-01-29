import { Comment } from "../../../../entities/Comment";

export interface IGetAllComments {

    execute(): Promise<Comment[]>

}