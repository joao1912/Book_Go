import { IDeleteAllComments } from "../../repositories/comment/IDeleteAllComments";

export class DeleteAllComments implements IDeleteAllComments {
    execute(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}