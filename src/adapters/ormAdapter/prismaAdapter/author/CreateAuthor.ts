import { IAuthor, Author } from "../../../../entities/Author.js";
import { ICreateAuthor } from "../../repositories/author/ICreateAuthor.js";
import { prisma } from "../db.js";
import handlePrismaError from "../util/handlePrismaError.js";

export class CreateAuthor implements ICreateAuthor {

    async execute({props}: Omit<Author, "id">): Promise<Author | void> {

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
            
            return handlePrismaError("AuthorError", error)

        }
    }
}