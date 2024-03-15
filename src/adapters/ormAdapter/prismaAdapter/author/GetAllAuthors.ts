import { Author } from "../../../../entities/Author.js";
import { IGetAllAuthors } from "../../repositories/author/IGetAllAuthors.js";
import { prisma } from "../db.js";
import handlePrismaError from "../util/handlePrismaError.js";


export class GetAllAuthors implements IGetAllAuthors {

    async execute(): Promise<Author[] | void> {
        
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
            
            return handlePrismaError("AuthorError", error)

        }

    }
}