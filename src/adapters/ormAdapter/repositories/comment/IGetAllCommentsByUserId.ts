import { Comment } from "../../../../entities/Comment"

export interface IGetAllCommentsByUserId {

    execute(userId: string): Promise<Comment[]>

}