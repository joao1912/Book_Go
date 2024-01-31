import { Book } from "../../../../entities/Book";
import { ICreateFavorite } from "../../repositories/favorite/ICreateFavorite";
import { prisma } from "../db";


export class CreateFavorite implements ICreateFavorite {

    async execute(userId: string, bookId: string): Promise<Book> {
        
        try {
            
            const favorited = await prisma.favorite.create({
                data: {
                    fk_id_book: bookId,
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

            if (favorited.book.books_authors?.author == null) throw new Error('Bad Request: Author is null')
            if (favorited.book.books_tags?.tag == null) throw new Error('Bad Request: Genre is null')

            return new Book({
                id: favorited.book.id,
                title: favorited.book.title,
                synopsis: favorited.book.synopsis,
                author: favorited.book.books_authors.author.name,
                genre: favorited.book.books_tags.tag.genre,
                price: favorited.book.price
            })

        } catch (error) {
            
            throw new Error('Internal server error' + error)

        }
    }
}