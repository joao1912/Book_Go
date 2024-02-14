import { Book } from "../../../../entities/Book";
import { IGetAllFavoritesByUserId } from "../../repositories/favorite/IGetAllFavoritesByUserId";
import { prisma } from "../db";


export class GetAllFavoritesByUserId implements IGetAllFavoritesByUserId {

    async execute(userId: string): Promise<Book[]> {

        try {

            const allFavorites = await prisma.user.findMany({
                where: {
                    id: userId
                },
                select: {
                    favorites: {
                        select: {
                            id: true,
                            fk_id_book: true,
                            fk_id_user: true,
                            book: {
                                select: {
                                    id: true,
                                    title: true,
                                    synopsis: true,
                                    price: true,
                                    publishedDate: true,
                                    pageCount: true,
                                    author: {
                                        select: {
                                            name: true,
                                        },
                                    },
                                    tag: {
                                        select: {
                                            genre: true,
                                        },
                                    },
                                }
                            }
                        }
                    }
                }
            })

            const allInstances: Book[] = []

            for (let prop of allFavorites[0].favorites) {

                if (prop.book.author == null) continue
                if (prop.book.tag == null) continue

                allInstances.push(new Book({
                    id: prop.book.id,
                    title: prop.book.title,
                    synopsis: prop.book.synopsis,
                    author: prop.book.author[0].name,
                    genre: prop.book.tag[0].genre,
                    price: prop.book.price,
                    pageCount: prop.book.pageCount,
                    publishedDate: prop.book.publishedDate
                }))

            }

            return allInstances

        } catch (error) {

            throw new Error('Internal server error' + error)

        }

    }
}