import { Author } from "../../../../entities/Author";
import { IGetAuthorByName } from "../../repositories/author/IGetAuthorByName";
import { prisma } from "../db";


export class GetAuthorByName implements IGetAuthorByName {

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
            
            throw new Error('Internal server error' + error)

        }
    }
}