import { IComment, Comment } from "../../../../entities/Comment";
import { ICreateComment } from "../../repositories/comment/ICreateComment";
import { prisma } from "../../../../../prisma/db";

export class CreateComment implements ICreateComment {

    async execute(comment: Omit<IComment, "id">): Promise<Comment> {
        
        const userData = await prisma.comment.create({
            data: {
                
            }
        })

    }
}