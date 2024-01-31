import { Book } from "../../../../entities/Book";
import { IGetAllFavoritesByUserId } from "../../repositories/favorite/IGetAllFavoritesByUserId";
import { prisma } from "../db";


export class GetAllFavoritesByUserId implements IGetAllFavoritesByUserId {

    async execute(userId: string): Promise<Book[]> {
    
        try {
            
            const allFavorites = await prisma.favorite.findMany({
                where: {
                    fk_id_user: userId
                },
                select: {
                    book: {
                        select: {
                            id: true,
                            title: true,
                            synopsis: true,
                            price: true,
                            books_authors: {
                                select: {
                                    author: {
                                        select: {
                                            name: true
                                        }
                                    }
                                }
                            },
                            books_tags: {
                                select: {
                                    tag: {
                                        select: {
                                            genre: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            })

            const allInstances: Book[] = []

            for(let favorite of allFavorites) {

                if (favorite.book.books_authors?.author == null) continue
                if (favorite.book.books_tags?.tag == null) continue

                allInstances.push(new Book({
                    id: favorite.book.id,
                    title: favorite.book.title,
                    synopsis: favorite.book.synopsis,
                    author: favorite.book.books_authors.author.name,
                    genre: favorite.book.books_tags.tag.genre,
                    price: favorite.book.price
                }))

            }

            return allInstances

        } catch (error) {
            
            throw new Error('Internal server error' + error)

        }

    }
}