import { IAuthor, Author } from "../../../../entities/Author";
import { ICreateAuthor } from "../../repositories/author/ICreateAuthor";
import { prisma } from "../db";

export class CreateAuthor implements ICreateAuthor {

    async execute({description, name}: Omit<IAuthor, "id">): Promise<Author> {
        
        try {

            const newAuthor = await prisma.author.create({
                data: {
                    name: name,
                    description: description
                }
            })

            return new Author({
                id: newAuthor.id,
                name: newAuthor.name,
                description: newAuthor.description
            })
            
        } catch (error) {
            
            throw new Error('Internal server error' + error)

        }
    }
}