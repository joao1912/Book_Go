import { IAuthor, Author } from "../../../../entities/Author";
import { IUpdateAuthor } from "../../repositories/author/IUpdateAuthor";
import { prisma } from "../db";


export class UpdateAuthor implements IUpdateAuthor {

    async execute({id, description, name}: Partial<IAuthor>): Promise<Author> {
        
        try {

            const updatedAuthor = await prisma.author.update({
                where: {
                    id: id
                },
                data: {
                    name: name || undefined,
                    description: description || undefined
                }
            })

            return new Author({
                id: updatedAuthor.id,
                name: updatedAuthor.name,
                description: updatedAuthor.description
            })
            
        } catch (error) {

            throw new Error('Internal server error: ' + error)

        }
    }
}