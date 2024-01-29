import { IComment, Comment } from "../../../../entities/Comment";

export interface ICreateComment {

    execute(comment: Omit<IComment, 'id'>): Promise<Comment>

}