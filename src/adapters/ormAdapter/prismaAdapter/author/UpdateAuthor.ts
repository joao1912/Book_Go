import { IAuthor, Author } from "../../../../entities/Author.js";
import { IUpdateAuthor } from "../../repositories/author/IUpdateAuthor.js";
import { prisma } from "../db.js";


export class UpdateAuthor implements IUpdateAuthor {

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

            throw new Error('Internal server error: ' + error)

        }
    }
}