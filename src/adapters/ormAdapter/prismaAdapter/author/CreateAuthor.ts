import { IAuthor, Author } from "../../../../entities/Author";
import { ICreateAuthor } from "../../repositories/author/ICreateAuthor";
import { prisma } from "../db";
import handlePrismaError from "../util/handlePrismaError";

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
            
            handlePrismaError("AuthorError", error)

        }
    }
}