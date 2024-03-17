import { Author } from "../../../../entities/Author";
import { IGetAuthorById } from "../../repositories/author/IGetAuthorById";
import { prisma } from "../db";
import handlePrismaError from "../util/handlePrismaError";


export class GetAuthorById implements IGetAuthorById {

    async execute(id: string): Promise<Author> {
        try {

            const author = await prisma.author.findUnique({
                where: {
                    id: id
                }
            })

            if (author == null) {
                throw new Error('Bad Request: this author dont exists')
            }
            
            return new Author({
                id: author.id,
                name: author.name,
                description: author.description || ""
            }) 
           
        } catch (error) {
            
            handlePrismaError("AuthorError", error)

        }
    }
}