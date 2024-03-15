import { IComment, Comment } from "../../../../entities/Comment";

export interface ICreateComment {

    execute(comment: Omit<Comment, 'id'>): Promise<Comment | void>

}