import { Author } from "../../../../entities/Author.js";
import { IGetAuthorByName } from "../../repositories/author/IGetAuthorByName.js";
import { prisma } from "../db.js";
import handlePrismaError from "../util/handlePrismaError.js";


export class GetAuthorByName implements IGetAuthorByName {

    async execute(name: string): Promise<Author | void> {
        try {

            const author = await prisma.author.findUnique({
                where: {
                    name: name
                }
            })

            if (author == null) {
                throw new Error('Bad Request: this author dont exists')
            }
            
            return new Author({
                id: author.id,
                name: author.name,
                description: author.description || ''
            }) 
           
        } catch (error) {
            
            return handlePrismaError("AuthorError", error)

        }
    }
}