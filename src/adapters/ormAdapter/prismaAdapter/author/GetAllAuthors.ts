import { Author } from "../../../../entities/Author.js";
import { IGetAllAuthors } from "../../repositories/author/IGetAllAuthors.js";
import { prisma } from "../db.js";


export class GetAllAuthors implements IGetAllAuthors {

    async execute(): Promise<Author[]> {
        
        try {

            const allAuthors = await prisma.author.findMany()
            
            const AllInstances: Author[] = []

            for(let author of allAuthors) {

                AllInstances.push(

                    new Author({
                        id: author.id,
                        name: author.name,
                        description: author.description || ''
                    })

                )

            }

            return AllInstances

        } catch (error) {
            
            throw new Error('Internal server error' + error)

        }

    }
}