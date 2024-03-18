import { Author } from "../../../../entities/Author";
import { IGetAuthorByName } from "../../repositories/author/IGetAuthorByName";
import { prisma } from "../db";
import handlePrismaError from "../util/handlePrismaError";


export class GetAuthorByName implements IGetAuthorByName {
    //@ts-ignore
    async execute(name: string): Promise<Author> {
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
            
            handlePrismaError("AuthorError", error)
            
        }
    }
}