import { IDeleteComment, IDeleteMessage } from "../../repositories/comment/IDeleteComment";

export class DeleteComment implements IDeleteComment {
    execute(id: string): Promise<IDeleteMessage> {
        throw new Error("Method not implemented.");
    }
    
}