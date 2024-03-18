import { IAuthor, Author } from "../../../../entities/Author";
import { IUpdateAuthor } from "../../repositories/author/IUpdateAuthor";
import { prisma } from "../db";
import handlePrismaError from "../util/handlePrismaError";


export class UpdateAuthor implements IUpdateAuthor {
    //@ts-ignore
    async execute({props}: Partial<Author>): Promise<Author> {

        try {

            const updatedAuthor = await prisma.author.update({
                where: {
                    id: props?.id
                },
                data: {
                    name: props?.name || undefined,
                    description: props?.description || undefined
                }
            })

            return new Author({
                id: updatedAuthor.id,
                name: updatedAuthor.name,
                description: updatedAuthor.description || ''
            })
            
        } catch (error) {

            handlePrismaError("AuthorError", error)
           
        }
    }
}