import { Author } from "../../../../entities/Author";
import { IGetAllAuthors } from "../../repositories/author/IGetAllAuthors";
import { prisma } from "../db";


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