import { IAuthor, Author } from "../../../../entities/Author.js";
import { ICreateAuthor } from "../../repositories/author/ICreateAuthor.js";
import { prisma } from "../db.js";

export class CreateAuthor implements ICreateAuthor {

    async execute({props}: Omit<Author, "id">): Promise<Author> {

        const {description, name} = props;

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
                description: newAuthor.description || ''
            })
            
        } catch (error) {
            
            throw new Error('Internal server error' + error)

        }
    }
}